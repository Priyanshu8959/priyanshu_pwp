# 🤖 Week 1 - Day 1 | My First LLM Application using Groq API

## 📌 Project Overview

This project is my first AI application built using Python and the Groq API.

The program sends a prompt to the Llama 3.3 70B model and prints the AI-generated response in the terminal.

---

## 🚀 What I Learned

- Installing Python packages
- Creating a virtual environment
- Using `.env` files to securely store API keys
- Loading environment variables with `python-dotenv`
- Connecting to the Groq API
- Sending prompts to an LLM
- Receiving and displaying AI responses

---

## 📂 Project Structure

```
day1/
│── hello_llm.py
│── .env
│── README.md
│── pyproject.toml
│── uv.lock
```

---

## 🛠️ Technologies Used

- Python
- Groq API
- python-dotenv
- Llama 3.3 70B Versatile

---

## ▶️ How to Run

1. Install dependencies

```bash
pip install groq python-dotenv
```

2. Create a `.env` file

```env
GROQ_API_KEY=your_api_key
```

3. Run the program

```bash
python hello_llm.py
```

---

## 📸 Sample Output

```
Who is Ajit Pawar?

Ajit Pawar is an Indian politician...
```

---

## 🎯 Learning Outcome

By completing this project, I understood how an AI application communicates with a Large Language Model using an API.
