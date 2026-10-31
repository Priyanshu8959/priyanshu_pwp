# Restaurant Agent

This project is a transparent, stateful restaurant operations agent built with
LangGraph and Groq's `openai/gpt-oss-120b` model. It separates natural-language
understanding from business rules: the LLM extracts an order, while Python
controls stock, money, tokens, kitchen decisions, and customer outcomes.

## Architecture

```text
Customer message
      |
LangGraph: parse -> validate -> create -> cook -> confirm
      |                    |
      |                    +--> reject with reason
      |
SQLite order repository (restaurant.db)
      |
Waiter <-> Cook <-> inventory and payment state
```

### Included capabilities

- Natural-language order extraction through Groq
- Deterministic LangGraph order workflow with rejection branch
- SQLite persistence across restarts
- Inventory reservation when an order is created
- Menu quantities, prices, customization rules, and stock validation
- Unique order tokens
- Dine-in, takeaway, and delivery order types
- Payment tracking and refunds
- Serving and cancellation
- Kitchen problem reporting and up to two re-cook attempts
- Explicit `not served` outcome for failed fulfillment
- Customer feedback and 1–5 ratings
- CLI commands for operations and order inspection

## Run

Create a `.env` file in the repository root with your key:

```text
GROQ_API_KEY=your_new_groq_api_key
```

The application loads this value automatically with `python-dotenv`. Never
commit `.env` or paste a real API key into source code.

Then run:

```powershell
uv sync
uv run main.py
```

The sample menu and inventory are defined in `main.py`. The model extracts a
free-form order, then a compiled LangGraph runs these nodes:

`parse_order -> validate_order -> create_order -> cook_order -> confirm_order`

Invalid or unavailable orders follow the `reject_order` branch. The Python
workflow makes all availability, quantity, customisation, token, cooking,
re-cooking, serving, and feedback decisions; the model cannot promise stock
that the cook does not have.

An accepted order receives a unique token and a 15-minute estimate. Available
commands are:

```text
menu
orders
status R1001
serve R1001
pay R1001
cancel R1001
issue R1001 dish fell on the floor
feedback R1001 5 Excellent food
quit
```

`restaurant.db` is created automatically and is ignored by Git. Delete it
only when you intentionally want to reset local orders and tokens.

Each failed/rejected dish can be sent back to the kitchen for at most two
re-cook attempts. Orders that cannot be served are explicitly marked
`not served` and refunded.

## Security

Keep `GROQ_API_KEY` in the root `.env` file. `.env` is ignored by Git; never
paste the key into Python files, README files, commits, or screenshots. If a
key is exposed, revoke it in the Groq dashboard and create a replacement.