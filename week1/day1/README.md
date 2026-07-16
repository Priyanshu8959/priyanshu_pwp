# Week 1 – Day 1 | My First LLM Application Using Groq API

## Project Overview

This project is my first AI application built using Python and the Groq API. It sends a prompt to the **Llama 3.3 70B Versatile** model and displays the generated response in the terminal.

## What I Learned

- Setting up a Python development environment
- Creating and using a virtual environment
- Securely storing API keys with a `.env` file
- Loading environment variables using `python-dotenv`
- Connecting to the Groq API
- Sending prompts to a Large Language Model (LLM)
- Receiving and displaying AI-generated responses

## Project Structure

```text
day1/
├── hello_llm.py
├── .env
├── README.md
├── pyproject.toml
└── uv.lock
```

## Technologies Used

- Python
- Groq API
- python-dotenv
- Llama 3.3 70B Versatile

## Getting Started

### 1. Install Dependencies

```bash
pip install groq python-dotenv
```

### 2. Create a `.env` File

```env
GROQ_API_KEY=your_api_key
```

### 3. Run the Application

```bash
python hello_llm.py
```

## Sample Output

```text
Who is Ajit Pawar?

Ajit Pawar is an Indian politician...
```

## Learning Outcome

This project provided a practical introduction to integrating a Large Language Model into a Python application. It helped me understand how to authenticate with an AI API, send prompts, process responses, and build the foundation for more advanced LLM-based applications.

Deepali - today i am sad(rn listening song and pushing readme file and thinking about you).
