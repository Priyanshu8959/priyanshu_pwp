# 📅 Week 1 - Day 3: Understanding Tokens & Token Usage with Groq

## 📌 Objective

Today, I learned what **tokens** are and how to measure token usage while interacting with a Large Language Model (LLM) using the Groq API.

---

## 🧠 What I Learned

### ✅ What are Tokens?

Tokens are the basic units that an LLM processes. A token can be:

* A word
* Part of a word
* A punctuation mark
* A special character

The model counts tokens instead of words.

Example:

* `"Hi"` → 1 token
* `"Hello, how are you?"` → Multiple tokens

---

## 📊 Types of Tokens

### 🔹 Prompt Tokens

These are the tokens sent **to the model**.

Example:

```text
Who is Ajit Pawar?
```

---

### 🔹 Completion Tokens

These are the tokens generated **by the model** as its response.

---

### 🔹 Total Tokens

```text
Total Tokens = Prompt Tokens + Completion Tokens
```

This value represents the total number of tokens used for a request.

---

## 💻 What I Implemented

* Loaded the API key from a `.env` file.
* Connected to the Groq API.
* Stored multiple prompts inside a Python list.
* Used a `for` loop to send each prompt to the LLM.
* Retrieved token usage from `response.usage`.
* Printed:

  * Prompt
  * Prompt Tokens
  * Completion Tokens
  * Total Tokens

---

## 🚀 Concepts Practiced

* Python Lists
* `for` Loop
* Environment Variables (`.env`)
* Groq API
* Chat Completions API
* LLM Requests
* Token Usage
* Response Object
* f-Strings
* API Automation

---

## 📂 Files

```text
week1/day3/
│── main.py
│── pyproject.toml
│── uv.lock
│── .python-version
```

---

## 🎯 Key Takeaways

* LLMs process **tokens**, not words.
* Every API request consumes prompt and completion tokens.
* Token usage affects API cost and model limits.
* Multiple prompts can be automated using loops.
* The `response.usage` object provides detailed token statistics for every request.

---

