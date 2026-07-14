# 🤖 Week 1 - Day 2 | Understanding System Role & Temperature

## 📌 Project Overview

This project explores two important LLM concepts: **System Role** and **Temperature** using the Groq API.

I learned how to control an AI model's behavior through system instructions and how the temperature parameter affects the creativity and randomness of responses.

---

## 🚀 What I Learned

- Understanding the System Role
- Difference between System and User messages
- Controlling an AI assistant's behavior
- Understanding the Temperature parameter
- Sending multiple messages in a single API request
- Basic Prompt Engineering

---

## 📂 Project Structure

```
day2/
│── sys_temp.py
│── README.md
```

---

## 🛠️ Technologies Used

- Python
- Groq API
- python-dotenv
- Llama 3.3 70B Versatile

---

## 🧠 Concepts Covered

### System Role

The system message defines the AI's personality, tone, and behavior before it responds to the user's prompt.

### User Role

The user message contains the actual prompt or question that is sent to the model.

### Temperature

The temperature parameter controls the randomness and creativity of the AI's response.

- **0.0** → Very consistent and deterministic
- **0.7** → Balanced
- **1.0** → More creative
- **2.0** → Highly creative and unpredictable

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

3. Run the project

```bash
python sys_temp.py
```

---

## 📚 Key Takeaways

- Learned how System Role controls AI behavior.
- Understood the difference between System and User messages.
- Explored the impact of Temperature on AI responses.
- Sent multiple messages in a single API request.

---

## 🎯 Learning Outcome

After completing this project, I can control an LLM's behavior using system prompts and adjust its creativity using the temperature parameter.