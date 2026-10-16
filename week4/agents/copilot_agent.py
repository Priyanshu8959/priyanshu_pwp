import ast
import json
import operator
import os

from dotenv import load_dotenv
from groq import Groq
from tavily import TavilyClient


load_dotenv()

groq = Groq(api_key=os.getenv("GROQ_API_KEY"))
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

MODEL = "openai/gpt-oss-120b"


def web_search(query: str) -> str:
	"""Search the web for current information."""
	try:
		response = tavily.search(
			query=query,
			search_depth="basic",
			max_results=3,
		)

		results = []

		for result in response.get("results", []):
			results.append(
				f"Title: {result.get('title', '')}\n"
				f"URL: {result.get('url', '')}\n"
				f"Content: {result.get('content', '')}"
			)

		return "\n\n".join(results) or "No search results found."

	except Exception as error:
		return f"Web search failed: {error}"


OPERATORS = {
	ast.Add: operator.add,
	ast.Sub: operator.sub,
	ast.Mult: operator.mul,
	ast.Div: operator.truediv,
	ast.Mod: operator.mod,
	ast.Pow: operator.pow,
}


def calculate(expression: str) -> str:
	"""Safely calculate a basic mathematical expression."""
	def evaluate(node):
		if isinstance(node, ast.Constant):
			if isinstance(node.value, (int, float)) and not isinstance(node.value, bool):
				return node.value
			raise ValueError("Only numbers are allowed.")

		if isinstance(node, ast.BinOp):
			operation = OPERATORS.get(type(node.op))
			if operation is None:
				raise ValueError("Unsupported operator.")
			return operation(evaluate(node.left), evaluate(node.right))

		if isinstance(node, ast.UnaryOp):
			value = evaluate(node.operand)
			if isinstance(node.op, ast.UAdd):
				return value
			if isinstance(node.op, ast.USub):
				return -value

		raise ValueError("Invalid mathematical expression.")

	try:
		tree = ast.parse(expression, mode="eval")
		return str(evaluate(tree.body))
	except Exception as error:
		return f"Calculation failed: {error}"


AVAILABLE_TOOLS = {
	"web_search": web_search,
	"calculate": calculate,
}


TOOLS = [
	{
		"type": "function",
		"function": {
			"name": "web_search",
			"description": (
				"Search the web for current information, news, prices, "
				"recent events, statistics, or facts that may have changed."
			),
			"parameters": {
				"type": "object",
				"properties": {
					"query": {
						"type": "string",
						"description": "A specific web search query.",
					}
				},
				"required": ["query"],
			},
		},
	},
	{
		"type": "function",
		"function": {
			"name": "calculate",
			"description": (
				"Perform basic mathematical calculations such as addition, "
				"subtraction, multiplication, division, percentages, and powers."
			),
			"parameters": {
				"type": "object",
				"properties": {
					"expression": {
						"type": "string",
						"description": "An expression such as '2 * 2' or '5000 - 1250'.",
					}
				},
				"required": ["expression"],
			},
		},
	},
]


SYSTEM_PROMPT = """
You are a helpful assistant.

Use web_search for current, online, or changing information.
Use calculate for mathematical calculations.
Use tools whenever they are needed. After receiving tool results, answer the
user clearly and concisely. Include useful source URLs when web search is used.
"""


def run_agent(user_query: str, max_iterations: int = 5) -> str:
	messages = [
		{"role": "system", "content": SYSTEM_PROMPT},
		{"role": "user", "content": user_query},
	]

	for _ in range(max_iterations):
		response = groq.chat.completions.create(
			model=MODEL,
			messages=messages,
			tools=TOOLS,
			tool_choice="auto",
		)

		message = response.choices[0].message
		messages.append(message.model_dump(exclude_none=True))

		if not message.tool_calls:
			return message.content or ""

		for tool_call in message.tool_calls:
			tool_name = tool_call.function.name

			try:
				arguments = json.loads(tool_call.function.arguments)

				if tool_name not in AVAILABLE_TOOLS:
					result = f"Unknown tool: {tool_name}"
				else:
					result = AVAILABLE_TOOLS[tool_name](**arguments)
			except Exception as error:
				result = f"Tool execution failed: {error}"

			messages.append(
				{
					"role": "tool",
					"tool_call_id": tool_call.id,
					"content": str(result),
				}
			)

	return "I could not complete the request within the allowed steps."


if __name__ == "__main__":
	query = input("Ask something: ")
	print(run_agent(query))
