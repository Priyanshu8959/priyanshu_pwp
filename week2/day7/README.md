# ReAct Agent using Groq

## Overview

This project is a simple implementation of the **ReAct pattern**, where ReAct means:

**Reasoning + Action**

The AI model first decides what it needs to do, then calls a tool, receives the tool result as an observation, and continues until it produces the final answer.

In this project, the AI works as a shopping assistant.

It can:

- Find the price of a product
- Perform mathematical calculations
- Use one tool at a time
- Read tool observations
- Generate the final answer after completing all steps

---

## ReAct Workflow

```text
User Question
     ↓
LLM Reasoning
     ↓
Tool Action
     ↓
Python Executes Tool
     ↓
Observation
     ↓
LLM Reasoning Again
     ↓
Final Answer
```

For example:

 
## Technologies Used

- Python
- Groq API
- Llama 3.3 70B Versatile
- Python Dotenv
- Regular Expressions
- ReAct Agent Pattern
- Tool Calling
- Conversation Memory

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install the required packages:

```bash
pip install groq python-dotenv
```

---

## Environment Variables

Create a `.env` file inside the project folder.

```env
GROQ_API_KEY=your_groq_api_key
```

Do not upload your `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
```

---

## How to Run

Run the Python file:

```bash
python react_chain.py
```
 

## Important Concepts Learned

Through this project, I learned:

- What the ReAct pattern is
- How reasoning and actions work together
- How an LLM can use Python functions as tools
- How to create a tool dictionary
- How to extract tool calls using regular expressions
- How to execute tools dynamically
- How to return observations to an LLM
- How conversation history works
- How agent loops work
- How system prompts control model behaviour
- How to stop an agent after receiving the final answer
- How to use environment variables securely
- How to connect Python with the Groq API

---

## ReAct vs Normal LLM Response

A normal LLM directly generates an answer.

```text
User Question
     ↓
LLM Answer
```

A ReAct agent can interact with external tools before answering.

```text
User Question
     ↓
Reasoning
     ↓
Tool Action
     ↓
Observation
     ↓
More Reasoning
     ↓
Final Answer
```

This makes the model more useful for tasks that require:

- Calculations
- Database queries
- API calls
- Searching information
- Reading files
- Executing functions
- Using external systems

---

 

## Future Improvements

This project can be improved by adding:

- More shopping products
- A real product database
- Safe mathematical expression parsing
- Native LLM tool calling
- Structured JSON outputs
- Error handling for invalid tool calls
- Multiple arguments for tools
- Web search tools
- Weather tools
- Database tools
- File-reading tools
- A command-line chat interface
- A Streamlit or React frontend

---

## Key Learning

The most important learning from this project is:

```text
An AI agent does not only generate text.

It can reason about a problem, choose an action, execute a tool,
observe the result, and continue until the task is complete.
```

This complete cycle is called:

```text
Reasoning + Action = ReAct
```

---

## Author

**Priyanshu Pawar**

B.Tech Computer Science and Business Systems
Learning AI Engineering, LLMs, Agents and Tool Use
