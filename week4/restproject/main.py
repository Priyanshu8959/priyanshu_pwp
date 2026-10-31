"""A small, transparent restaurant waiter/cook agent.

The LLM is used only to understand free-form customer messages and format
friendly replies. Inventory, cooking attempts, tokens, and order status are
handled by Python so that the restaurant never promises an unavailable order.
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path
from dataclasses import asdict, dataclass
from enum import Enum
from typing import Any, TypedDict

from dotenv import load_dotenv
from langgraph.graph import END, START, StateGraph


MODEL = "openai/gpt-oss-120b"
MAX_RECOOKS = 2

load_dotenv()


@dataclass(frozen=True)
class MenuItem:
    name: str
    price: float
    quantity_available: int
    customizable: bool = False


DEFAULT_MENU = (
    MenuItem("Classic Burger", 8.99, 3, True),
    MenuItem("Margherita Pizza", 11.99, 5, True),
    MenuItem("Pasta Alfredo", 10.99, 4, True),
    MenuItem("French Fries", 3.99, 10, False),
    MenuItem("Chocolate Cake", 5.99, 6, False),
)


class OrderStatus(str, Enum):
    CONFIRMED = "confirmed"
    COOKING = "cooking"
    READY = "ready"
    SERVED = "served"
    CANCELLED = "cancelled"
    NOT_SERVED = "not served"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    REFUNDED = "refunded"


@dataclass
class Order:
    token: str
    item_name: str
    quantity: int
    customisation: str | None
    status: OrderStatus = OrderStatus.CONFIRMED
    cook_attempts: int = 0
    total: float = 0.0
    customer_name: str = "Guest"
    order_type: str = "dine-in"
    payment_status: PaymentStatus = PaymentStatus.PENDING
    created_at: str = ""
    feedback: dict[str, Any] | None = None


class OrderStore:
    """Small SQLite repository so orders survive application restarts."""

    def __init__(self, path: str | Path = "restaurant.db") -> None:
        self.path = Path(path)
        with sqlite3.connect(self.path) as connection:
            connection.execute(
                """CREATE TABLE IF NOT EXISTS orders (
                    token TEXT PRIMARY KEY, payload TEXT NOT NULL
                )"""
            )

    def save(self, order: Order) -> None:
        payload = asdict(order)
        payload["status"] = order.status.value
        payload["payment_status"] = order.payment_status.value
        with sqlite3.connect(self.path) as connection:
            connection.execute(
                "INSERT OR REPLACE INTO orders(token, payload) VALUES (?, ?)",
                (order.token, json.dumps(payload)),
            )

    def load_all(self) -> dict[str, Order]:
        with sqlite3.connect(self.path) as connection:
            rows = connection.execute("SELECT payload FROM orders").fetchall()
        orders: dict[str, Order] = {}
        for (payload,) in rows:
            data = json.loads(payload)
            data["status"] = OrderStatus(data["status"])
            data["payment_status"] = PaymentStatus(data["payment_status"])
            orders[data["token"]] = Order(**data)
        return orders


class RestaurantError(Exception):
    """A customer-facing restaurant workflow error."""


class OrderGraphState(TypedDict, total=False):
    """State passed between the LangGraph waiter and cook nodes."""

    message: str
    item_name: str
    quantity: int
    customisation: str | None
    order: Order
    response: str
    error: str


class Cook:
    def __init__(self, menu: tuple[MenuItem, ...] = DEFAULT_MENU) -> None:
        self._menu = {item.name.casefold(): item for item in menu}

    def menu_item(self, item_name: str) -> MenuItem | None:
        return self._menu.get(item_name.casefold())

    def approve_order(self, item_name: str, quantity: int, customisation: str | None) -> MenuItem:
        item = self.menu_item(item_name)
        if item is None:
            raise RestaurantError(f"Sorry, {item_name} is not available on today's menu.")
        if quantity < 1:
            raise RestaurantError("Please order at least one item.")
        if quantity > item.quantity_available:
            raise RestaurantError(
                f"Sorry, the cook has only {item.quantity_available} {item.name} "
                f"available, so we cannot prepare {quantity}."
            )
        if customisation and not item.customizable:
            raise RestaurantError(f"Sorry, {item.name} cannot be customised today.")
        return item

    def reserve_ingredients(self, item_name: str, quantity: int) -> None:
        item = self.menu_item(item_name)
        if item is None or item.quantity_available < quantity:
            raise RestaurantError("The requested ingredients are no longer available.")
        self._menu[item.name.casefold()] = MenuItem(
            item.name,
            item.price,
            item.quantity_available - quantity,
            item.customizable,
        )

    def release_ingredients(self, item_name: str, quantity: int) -> None:
        item = self.menu_item(item_name)
        if item is None:
            return
        self._menu[item.name.casefold()] = MenuItem(
            item.name,
            item.price,
            item.quantity_available + quantity,
            item.customizable,
        )

    def cook(self, order: Order) -> None:
        """Mark an approved order as ready after the cook accepts it."""
        order.cook_attempts += 1
        order.status = OrderStatus.READY

    def recook(self, order: Order, reason: str) -> None:
        if order.status != OrderStatus.READY:
            raise RestaurantError("Only a cooked order can be sent back to the kitchen.")
        if order.cook_attempts >= MAX_RECOOKS + 1:
            order.status = OrderStatus.NOT_SERVED
            raise RestaurantError(
                f"We are sorry, but this order cannot be served after {MAX_RECOOKS} re-cook attempts."
            )
        order.status = OrderStatus.COOKING
        self.cook(order)


class Waiter:
    def __init__(self, cook: Cook | None = None, store: OrderStore | None = None) -> None:
        self.cook = cook or Cook()
        self.store = store
        self.orders: dict[str, Order] = store.load_all() if store else {}
        self._next_token = 1001
        if self.orders:
            self._next_token = max(int(token[1:]) for token in self.orders) + 1

    def place_order(
        self,
        item_name: str,
        quantity: int = 1,
        customisation: str | None = None,
        customer_name: str = "Guest",
        order_type: str = "dine-in",
    ) -> Order:
        order = self.create_order(item_name, quantity, customisation, customer_name, order_type)
        self.cook.cook(order)
        self._save(order)
        return order

    def create_order(
        self,
        item_name: str,
        quantity: int = 1,
        customisation: str | None = None,
        customer_name: str = "Guest",
        order_type: str = "dine-in",
    ) -> Order:
        item = self.cook.approve_order(item_name, quantity, customisation)
        if order_type not in {"dine-in", "takeaway", "delivery"}:
            raise RestaurantError("Order type must be dine-in, takeaway, or delivery.")
        self.cook.reserve_ingredients(item_name, quantity)
        token = f"R{self._next_token}"
        self._next_token += 1
        order = Order(
            token=token,
            item_name=item.name,
            quantity=quantity,
            customisation=customisation,
            total=round(item.price * quantity, 2),
            status=OrderStatus.COOKING,
            customer_name=customer_name.strip() or "Guest",
            order_type=order_type,
            created_at=datetime.now(timezone.utc).isoformat(),
        )
        self.orders[token] = order
        self._save(order)
        return order

    def serve_order(self, token: str) -> Order:
        order = self._find(token)
        if order.status != OrderStatus.READY:
            order.status = OrderStatus.NOT_SERVED
            raise RestaurantError(f"Order {token} was not served and is marked 0.")
        order.status = OrderStatus.SERVED
        order.payment_status = PaymentStatus.PAID
        self._save(order)
        return order

    def pay_order(self, token: str) -> Order:
        order = self._find(token)
        if order.status == OrderStatus.CANCELLED:
            raise RestaurantError("A cancelled order cannot be paid.")
        order.payment_status = PaymentStatus.PAID
        self._save(order)
        return order

    def cancel_order(self, token: str) -> Order:
        order = self._find(token)
        if order.status in {OrderStatus.SERVED, OrderStatus.CANCELLED, OrderStatus.NOT_SERVED}:
            raise RestaurantError("This order can no longer be cancelled.")
        order.status = OrderStatus.CANCELLED
        order.payment_status = PaymentStatus.REFUNDED
        self.cook.release_ingredients(order.item_name, order.quantity)
        self._save(order)
        return order

    def report_problem(self, token: str, reason: str) -> Order:
        order = self._find(token)
        if order.status not in (OrderStatus.READY, OrderStatus.SERVED):
            raise RestaurantError("This order is not currently eligible for a re-cook.")
        order.status = OrderStatus.READY
        try:
            self.cook.recook(order, reason)
        except RestaurantError:
            self._save(order)
            raise
        self._save(order)
        return order

    def add_feedback(self, token: str, rating: int, comment: str = "") -> Order:
        order = self._find(token)
        if order.status != OrderStatus.SERVED:
            raise RestaurantError("Feedback can be recorded after the order is served.")
        if not 1 <= rating <= 5:
            raise RestaurantError("Please provide a rating from 1 to 5.")
        order.feedback = {"rating": rating, "comment": comment.strip()}
        self._save(order)
        return order

    def mark_not_served(self, token: str) -> Order:
        order = self._find(token)
        order.status = OrderStatus.NOT_SERVED
        order.payment_status = PaymentStatus.REFUNDED
        self._save(order)
        return order

    def _save(self, order: Order) -> None:
        if self.store:
            self.store.save(order)

    def _find(self, token: str) -> Order:
        try:
            return self.orders[token.upper()]
        except KeyError as error:
            raise RestaurantError(f"Token {token} was not found.") from error


def menu_text(cook: Cook) -> str:
    return "\n".join(
        f"- {item.name}: ${item.price:.2f} ({item.quantity_available} available)"
        for item in cook._menu.values()
    )


def order_text(order: Order) -> str:
    customisation = f", {order.customisation}" if order.customisation else ""
    return (
        f"{order.token} | {order.status.value} | {order.item_name} x{order.quantity}"
        f"{customisation} | {order.order_type} | ${order.total:.2f} | "
        f"payment: {order.payment_status.value}"
    )


class RestaurantAgent:
    """LangGraph front end backed by the deterministic waiter/cook workflow."""

    def __init__(self, waiter: Waiter | None = None, client: Any | None = None) -> None:
        self.waiter = waiter or Waiter()
        self.client = client
        self.graph = self._build_graph()

    def _build_graph(self) -> Any:
        workflow = StateGraph(OrderGraphState)
        workflow.add_node("parse_order", self._parse_order_node)
        workflow.add_node("validate_order", self._validate_order_node)
        workflow.add_node("create_order", self._create_order_node)
        workflow.add_node("cook_order", self._cook_order_node)
        workflow.add_node("confirm_order", self._confirm_order_node)
        workflow.add_node("reject_order", self._reject_order_node)
        workflow.add_edge(START, "parse_order")
        workflow.add_edge("parse_order", "validate_order")
        workflow.add_conditional_edges(
            "validate_order",
            self._validation_route,
            {"create_order": "create_order", "reject_order": "reject_order"},
        )
        workflow.add_edge("create_order", "cook_order")
        workflow.add_edge("cook_order", "confirm_order")
        workflow.add_edge("confirm_order", END)
        workflow.add_edge("reject_order", END)
        return workflow.compile()

    def _parse_order_node(self, state: OrderGraphState) -> OrderGraphState:
        try:
            data = self.parse_order(state["message"])
            return {
                "item_name": str(data.get("item_name", "")).strip(),
                "quantity": data.get("quantity", 1),
                "customisation": data.get("customisation"),
            }
        except RestaurantError as error:
            return {"error": str(error)}

    def _validate_order_node(self, state: OrderGraphState) -> OrderGraphState:
        if state.get("error"):
            return {}
        item_name = state.get("item_name", "")
        quantity = state.get("quantity")
        customisation = state.get("customisation")
        if (
            not item_name
            or not isinstance(quantity, int)
            or isinstance(quantity, bool)
            or quantity < 1
        ):
            return {"error": "Please provide a dish name and a positive whole-number quantity."}
        try:
            self.waiter.cook.approve_order(item_name, quantity, customisation)
        except RestaurantError as error:
            return {"error": str(error)}
        return {}

    def _validation_route(self, state: OrderGraphState) -> str:
        return "reject_order" if state.get("error") else "create_order"

    def _create_order_node(self, state: OrderGraphState) -> OrderGraphState:
        try:
            order = self.waiter.create_order(
                state["item_name"],
                state["quantity"],
                state.get("customisation"),
            )
            return {"order": order}
        except RestaurantError as error:
            return {"error": str(error)}

    def _cook_order_node(self, state: OrderGraphState) -> OrderGraphState:
        if state.get("error"):
            return {}
        self.waiter.cook.cook(state["order"])
        return {}

    def _confirm_order_node(self, state: OrderGraphState) -> OrderGraphState:
        if state.get("error"):
            return {}
        order = state["order"]
        return {
            "response": (
                f"Thank you! Order {order.token} is confirmed. The cook is preparing "
                f"{order.quantity} x {order.item_name}; please allow 15 minutes. "
                f"Total: ${order.total:.2f}."
            )
        }

    def _reject_order_node(self, state: OrderGraphState) -> OrderGraphState:
        return {"response": f"Waiter: {state.get('error', 'The order could not be accepted.')}"}

    def parse_order(self, message: str) -> dict[str, Any]:
        if self.client is None:
            raise RestaurantError(
                "GROQ_API_KEY is required to understand an order. "
                "Set it in the environment and try again."
            )
        response = self.client.chat.completions.create(
            model=MODEL,
            temperature=0,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Extract a restaurant order as JSON with exactly these keys: "
                        "item_name (string), quantity (integer), customisation (string or null). "
                        "Do not invent menu items."
                    ),
                },
                {"role": "user", "content": message},
            ],
        )
        content = response.choices[0].message.content
        if not content:
            raise RestaurantError("The order interpreter returned an empty response.")
        try:
            parsed = json.loads(content)
        except json.JSONDecodeError as error:
            raise RestaurantError("The order interpreter returned invalid order data.") from error
        if not isinstance(parsed, dict):
            raise RestaurantError("The order interpreter returned an invalid order shape.")
        return parsed

    def order_from_message(self, message: str) -> str:
        result = self.graph.invoke({"message": message})
        return result["response"]


def build_agent() -> RestaurantAgent:
    client = None
    api_key = os.getenv("GROQ_API_KEY")
    if api_key:
        try:
            from groq import Groq
        except ImportError as error:
            raise RestaurantError("Install the 'groq' package before using the LLM agent.") from error
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    return RestaurantAgent(waiter=Waiter(store=OrderStore()), client=client)


def main() -> None:
    print("Restaurant Agent")
    agent = build_agent()
    print("\nMenu:\n" + menu_text(agent.waiter.cook))
    print(
        "\nCommands: order text | status TOKEN | serve TOKEN | pay TOKEN | "
        "cancel TOKEN | issue TOKEN REASON | feedback TOKEN RATING COMMENT | "
        "orders | menu | quit"
    )
    while True:
        try:
            message = input("\nCustomer: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            return
        if message.casefold() in {"quit", "exit"}:
            print("Thank you for visiting. Goodbye!")
            return
        try:
            status_match = re.fullmatch(r"status\s+(R\d+)", message, re.IGNORECASE)
            serve_match = re.fullmatch(r"serve\s+(R\d+)", message, re.IGNORECASE)
            pay_match = re.fullmatch(r"pay\s+(R\d+)", message, re.IGNORECASE)
            cancel_match = re.fullmatch(r"cancel\s+(R\d+)", message, re.IGNORECASE)
            issue_match = re.fullmatch(r"issue\s+(R\d+)\s+(.+)", message, re.IGNORECASE)
            feedback_match = re.fullmatch(
                r"feedback\s+(R\d+)\s+([1-5])(?:\s+(.*))?", message, re.IGNORECASE
            )
            if message.casefold() == "menu":
                print(menu_text(agent.waiter.cook))
            elif message.casefold() == "orders":
                print("\n".join(order_text(order) for order in agent.waiter.orders.values()) or "No orders yet.")
            elif status_match:
                order = agent.waiter._find(status_match.group(1))
                print(order_text(order))
            elif serve_match:
                print(f"Served: {order_text(agent.waiter.serve_order(serve_match.group(1)))}")
            elif pay_match:
                print(f"Payment recorded: {order_text(agent.waiter.pay_order(pay_match.group(1)))}")
            elif cancel_match:
                print(f"Cancelled and refunded: {order_text(agent.waiter.cancel_order(cancel_match.group(1)))}")
            elif issue_match:
                order = agent.waiter.report_problem(issue_match.group(1), issue_match.group(2))
                print(f"Kitchen recovery started: {order_text(order)}")
            elif feedback_match:
                order = agent.waiter.add_feedback(
                    feedback_match.group(1), int(feedback_match.group(2)), feedback_match.group(3) or ""
                )
                print(f"Thank you for your feedback on {order.token}!")
            else:
                print(agent.order_from_message(message))
        except RestaurantError as error:
            print(f"Waiter: {error}")
        except Exception as error:
            print(f"Waiter: I could not complete that request: {error}", file=sys.stderr)


if __name__ == "__main__":
    main()
