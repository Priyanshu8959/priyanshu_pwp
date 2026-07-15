# 🚀 Week 1 - Day 4: Structured Outputs with Pydantic & JSON

## 📌 Overview

On Day 4, I learned how to generate **structured outputs** from a Large Language Model (LLM) using **Pydantic**, **JSON**, and **Groq**. Instead of receiving plain text responses, I explored how to extract information in a predefined JSON structure and validate it using Python.

---

## 🎯 What I Learned

* 📦 What is JSON and why it is used.
* 🏗️ Creating structured data using **Pydantic**.
* 📝 Defining output schemas with `BaseModel`.
* 🔄 Generating JSON Schema using `model_json_schema()`.
* 🤖 Writing effective **System Prompts** for structured extraction.
* 📤 Using `response_format={"type":"json_object"}` to receive JSON output.
* 📖 Converting JSON strings into Python dictionaries using `json.loads()`.
* ✅ Validating JSON data with Pydantic models.
* 🎯 Accessing structured fields like Python objects.

---

## 🛠️ Technologies Used

* Python
* Groq API
* Pydantic
* JSON
* python-dotenv
* uv
* Virtual Environment (`.venv`)

---

## 📂 Project Structure

```text
week1/day4/
│── main.py
│── README.md
│── pyproject.toml
│── uv.lock
│── .python-version
```

---

## 🚀 Features

* Loads API keys securely from a `.env` file.
* Defines a structured output schema using **Pydantic**.
* Generates a JSON schema dynamically.
* Sends a structured extraction prompt to the LLM.
* Receives responses in JSON format.
* Parses and validates JSON using Pydantic.
* Accesses extracted information as Python objects.

---

## 💡 Key Takeaways

* LLMs can generate **structured JSON**, not just plain text.
* **Pydantic** helps define and validate expected output formats.
* **JSON Schema** guides the model to produce consistent responses.
* `json.loads()` converts JSON strings into Python dictionaries.
* Structured outputs make AI applications more reliable and easier to integrate with backend systems.

---

 
