# Week 1 – Day 2 | Understanding System Role and Temperature

## Project Overview

This project explores two fundamental concepts of Large Language Models (LLMs): **System Role** and **Temperature** using the Groq API. It demonstrates how system instructions influence an AI model's behavior and how the temperature parameter affects the creativity and variability of its responses.

## What I Learned

- Understanding the purpose of the System Role
- Differentiating between System and User messages
- Controlling an AI assistant's behavior through system prompts
- Understanding the Temperature parameter
- Sending multiple messages in a single API request
- Applying basic prompt engineering techniques

## Project Structure

```text
day2/
├── sys_temp.py
└── README.md
```

## Technologies Used

- Python
- Groq API
- python-dotenv
- Llama 3.3 70B Versatile

## Concepts Covered

### System Role

The system message defines the AI model's personality, behavior, and response style before processing the user's prompt.

### User Role

The user message contains the prompt or question that is sent to the model.

### Temperature

The temperature parameter controls the randomness and creativity of the AI's responses.

- **0.0** – Highly consistent and deterministic
- **0.7** – Balanced between consistency and creativity
- **1.0** – More creative and varied
- **2.0** – Highly creative and unpredictable

## Getting Started

### 1. Install Dependencies

```bash
pip install groq python-dotenv
```

### 2. Create a `.env` File

```env
GROQ_API_KEY=your_api_key
```

### 3. Run the Project

```bash
python sys_temp.py
```

## Key Takeaways

- Learned how the System Role influences AI behavior.
- Understood the distinction between System and User messages.
- Explored how the Temperature parameter affects AI responses.
- Learned to send multiple messages in a single API request.

## Learning Outcome

This project strengthened my understanding of prompt engineering by demonstrating how to guide an LLM's behavior using system prompts and control the creativity of its responses through the temperature parameter.
.
.
.
.
.
.
.

Deepali i am doing all of this just for us.
