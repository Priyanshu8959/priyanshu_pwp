````markdown
# Week 1 – Day 4 | Structured Outputs with Pydantic and JSON

## Project Overview

This project focuses on generating structured outputs from a Large Language Model (LLM) using **Pydantic**, **JSON**, and the **Groq API**. Instead of receiving plain text responses, the application extracts information in a predefined JSON format and validates it using Pydantic models.

## What I Learned

- Understanding JSON and its purpose
- Creating structured data models using Pydantic
- Defining output schemas with `BaseModel`
- Generating JSON Schema using `model_json_schema()`
- Writing effective system prompts for structured extraction
- Receiving structured responses using `response_format={"type":"json_object"}`
- Converting JSON strings into Python dictionaries with `json.loads()`
- Validating JSON data using Pydantic
- Accessing structured data as Python objects

## Technologies Used

- Python
- Groq API
- Pydantic
- JSON
- python-dotenv
- uv
- Virtual Environment (`.venv`)

## Project Structure

```text
week1/day4/
├── main.py
├── README.md
├── pyproject.toml
├── uv.lock
└── .python-version
```

## Features

- Securely loads API keys from a `.env` file
- Defines structured output schemas using Pydantic
- Dynamically generates a JSON Schema
- Sends structured extraction prompts to the LLM
- Receives responses in JSON format
- Parses and validates JSON data using Pydantic
- Accesses extracted information as Python objects

## Key Takeaways

- Large Language Models can generate structured JSON in addition to plain text.
- Pydantic simplifies defining and validating expected output formats.
- JSON Schema helps guide the model to produce consistent responses.
- `json.loads()` converts JSON strings into Python dictionaries.
- Structured outputs improve the reliability and integration of AI applications with backend systems.
````
