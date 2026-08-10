# Prompt Chaining — AI Resume & Job Matching System

## Overview

This project demonstrates **Prompt Chaining** using the Groq API and Llama 3.3 70B.

The idea is to break one complex AI task into multiple smaller steps instead of asking the LLM to do everything in a single prompt.

### Problem

We want to determine whether a candidate's resume is a good match for a particular Job Description (JD).

Instead of directly asking:

> "Is this candidate suitable for this job?"

we create a chain of three LLM calls:

```text
Resume
   ↓
Step 1: Extract Candidate Skills
   ↓
Candidate Skills
   ↓
Step 2: Extract JD Skills
   ↓
JD Skills
   ↓
Step 3: Compare Both
   ↓
Final Score + Verdict
```

This is called **Prompt Chaining**.

---

# What is Prompt Chaining?

**Prompt chaining** means dividing a complex task into multiple smaller LLM tasks where the output of one task becomes the input of another task.

### Simple Example

Instead of:

```text
Resume + JD → "Give me a hiring decision"
```

we do:

```text
Resume
  ↓
Extract Resume Skills
  ↓
Candidate Skills

JD
  ↓
Extract Required Skills
  ↓
JD Skills

Candidate Skills + JD Skills
  ↓
Match Skills
  ↓
Score + Verdict
```

Each step has a specific responsibility.

---

# Architecture

The project contains three main LLM steps.

## Step 1 — Resume Skill Extraction

Function:

```python
step1_res_extract(RESUME)
```

### Input

The complete candidate resume.

Example:

```text
Python, FastAPI, MySQL, Docker,
REST APIs, Git
```

### Prompt

The LLM is instructed to:

- Extract only skills
- Not invent skills
- Return comma-separated skills
- Return no additional information

### Output

```text
Python, FastAPI, MySQL, Docker, REST APIs, Git
```

This output is stored in:

```python
candidate
```

---

# Step 2 — Job Description Skill Extraction

Function:

```python
step2_JD_extract(JD)
```

The second LLM call analyzes the Job Description.

### Input

```text
Strong Python
FastAPI or Django
PostgreSQL
Docker
AWS
REST APIs
2+ years experience
```

### Output

Something like:

```text
Python, FastAPI, Django, PostgreSQL, Docker, AWS, REST APIs
```

This output is stored in:

```python
jd
```

---

# Step 3 — Skill Matching

Function:

```python
step3_match(candidate, jd)
```

Now we have two outputs:

```text
Candidate:
Python, FastAPI, MySQL, Docker, REST APIs, Git

JD:
Python, FastAPI, Django, PostgreSQL, Docker, AWS, REST APIs
```

The third prompt asks the LLM to compare them and generate:

- A score between 1–100
- A short hiring verdict

For example:

```text
Score: 70/100

Verdict:
The candidate is a good match for the role but lacks
PostgreSQL and AWS experience.
```

---

# Where is the Prompt Chain?

The important part of the code is:

```python
candidate = step1_res_extract(RESUME)

jd = step2_JD_extract(JD)

score = step3_match(candidate, jd)
```

Notice what happens.

### First Call

```text
RESUME
  ↓
step1_res_extract()
  ↓
Candidate Skills
```

### Second Call

```text
JD
  ↓
step2_JD_extract()
  ↓
JD Skills
```

### Third Call

```text
Candidate Skills + JD Skills
  ↓
step3_match()
  ↓
Score + Verdict
```

The output of earlier steps is passed into later steps.

That is the **chain**.

---

# ask_llm() Function

Instead of writing the Groq API call three times, the code creates a reusable function:

```python
def ask_llm(system_prompt, user_prompt):
```

It creates two messages:

```python
sys_msg = {
    "role": "system",
    "content": system_prompt
}
```

and:

```python
user_msg = {
    "role": "user",
    "content": user_prompt
}
```

Then both are sent to the LLM:

```python
messages = [sys_msg, user_msg]

response = client.chat.completions.create(
    model=model,
    messages=messages
)
```

Finally:

```python
answer = response.choices[0].message.content
```

returns the model's response.

---

# System Prompt vs User Prompt

This project also demonstrates the difference between **system prompts** and **user prompts**.

## System Prompt

Defines the role and behavior of the model.

Example:

```text
You are a professional HR assistant.

Extract the skills from the candidate's resume.

Do not invent any skills.
```

It tells the model **how to behave**.

## User Prompt

Provides the actual data and task.

Example:

```text
Extract the skills from this resume:

{RESUME}
```

It tells the model **what information to process**.

---

# Why Use Prompt Chaining?

A single large prompt could theoretically do everything:

```text
Analyze this resume and JD,
extract skills,
compare them,
calculate score,
and give hiring verdict.
```

But prompt chaining has several advantages.

## 1. Better Control

Each prompt has one clear responsibility.

```text
Prompt 1 → Resume Skill Extraction
Prompt 2 → JD Skill Extraction
Prompt 3 → Skill Matching
```

## 2. Easier Debugging

If something goes wrong, we can identify the problematic step.

For example:

```text
Step 1 → Resume extraction problem
```

or:

```text
Step 3 → Matching problem
```

## 3. Reusability

Individual steps can be reused in other applications.

For example:

```python
step1_res_extract()
```

could be used in another recruitment application.

## 4. Better Prompt Design

Instead of one complicated prompt, we create smaller specialized prompts.

This makes the expected output clearer and easier to control.

---

# Important Limitation

The current implementation uses an LLM to calculate the final score.

This means the score is not necessarily mathematically consistent.

For example, the model might produce:

```text
78/100
```

for one candidate and:

```text
72/100
```

for another candidate even when the skill differences are very similar.

For a production recruitment system, it would be better to use **structured outputs and deterministic scoring logic**.

For example:

```text
Candidate Skills
       ↓
Required Skills
       ↓
Exact Matching
       ↓
Matched Skills = 5
Required Skills = 7
       ↓
5 / 7 × 100
       ↓
71.4%
```

The LLM can handle extraction, while Python handles the actual scoring.

---

# Environment Variables

The project uses `.env` to store the Groq API key.

Example:

```env
GROQ_API_KEY=your_api_key_here
```

The code loads it using:

```python
load_dotenv()
```

and retrieves it using:

```python
my_api_key = os.getenv("GROQ_API_KEY")
```

Never hard-code your API key directly in the Python file.

---

# Technologies Used

- Python
- Groq API
- Llama 3.3 70B
- python-dotenv
- Prompt Engineering
- Prompt Chaining
- LLM APIs

---

# Project Structure

```text
prompt-chaining/
│
├── main.py
├── .env
├── .gitignore
└── README.md
```

### .gitignore

Make sure `.env` is included:

```text
.env
__pycache__/
```

This prevents your API key from accidentally being uploaded to GitHub.

---

# How to Run

## 1. Install Dependencies

```bash
pip install groq python-dotenv
```

## 2. Create .env

```env
GROQ_API_KEY=your_api_key
```

## 3. Run the Program

```bash
python main.py
```

---

# Complete Flow

```text
                 ┌─────────────────┐
                 │     RESUME      │
                 └────────┬────────┘
                          ↓
                ┌───────────────────┐
                │ Step 1             │
                │ Extract Skills     │
                └────────┬──────────┘
                         ↓
                 Candidate Skills
                         │
                         │
                         ↓
                 ┌─────────────────┐
                 │ Step 3          │
                 │ Skill Matching  │
                 └────────┬────────┘
                          ↓
                    Score + Verdict
                          ↑
                          │
                     JD Skills
                          ↑
                ┌─────────┴─────────┐
                │ Step 2             │
                │ Extract JD Skills  │
                └─────────┬─────────┘
                          ↑
                 ┌─────────────────┐
                 │       JD        │
                 └─────────────────┘
```

---

# Key Learning

The main concept learned from this project is:

> **Don't always solve a complex LLM task with one large prompt. Break it into smaller, focused prompts and connect their outputs.**

In this project:

```text
Complex Task
     ↓
Resume Analysis
     ↓
Skill Extraction
     ↓
JD Analysis
     ↓
Skill Extraction
     ↓
Skill Comparison
     ↓
Final Decision
```

This is the fundamental idea behind **Prompt Chaining**.

---

# Possible Improvements

This project can be improved further by adding:

## Level 1

- Structured JSON output
- Better error handling
- Token usage tracking

## Level 2

- Deterministic skill matching
- Skill weighting
- Experience matching
- Missing-skill detection

## Level 3

- Resume PDF upload
- Multiple candidate comparison
- Candidate ranking
- Database storage
- FastAPI backend

## Level 4

Build a complete:

```text
AI Resume Screening System
```

with:

```text
PDF Resume
    ↓
Resume Parser
    ↓
LLM Skill Extraction
    ↓
JD Skill Extraction
    ↓
Skill Matching
    ↓
Candidate Score
    ↓
Candidate Ranking
```

---

# Interview Explanation

If an interviewer asks:

**"What did you learn from this project?"**

You can say:

> "I learned how to implement prompt chaining for an LLM-based resume screening workflow. Instead of asking the model to perform the entire task in one prompt, I divided it into multiple specialized steps. The first step extracts candidate skills, the second extracts required skills from the job description, and the third compares both outputs to generate a score and hiring verdict. This makes the workflow easier to control, debug, and extend."

---

# One-Line Definition

**Prompt Chaining = Breaking a complex LLM task into multiple prompts where the output of one step is used as input to another step.**
