# LLM Streaming with Groq

## Overview

This project demonstrates **Streaming** using the Groq API.

Normally, an LLM generates the complete response first and then sends it to the user.

With **streaming**, the response is sent in small chunks as the model generates it.

---

## Normal Response vs Streaming

### Normal Response

```text
User
 ↓
LLM generates complete answer
 ↓
Complete response
 ↓
User
```

The user has to wait until the entire response is generated.

### Streaming

```text
User
 ↓
LLM
 ↓
Chunk 1 → User
Chunk 2 → User
Chunk 3 → User
Chunk 4 → User
...
```

The user starts seeing the answer immediately.

---

## How Streaming Works

Streaming is enabled by:

```python
stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True
)
```

The important part is:

```python
stream=True
```

This tells the API to return the response **piece by piece** instead of returning the complete response at once.

---

## Reading the Chunks

We use a loop to receive every chunk:

```python
for chunk in stream:
    content = chunk.choices[0].delta.content

    if content:
        print(content, end="", flush=True)
```

### `chunk`

Each `chunk` contains a small part of the model's response.

### `delta.content`

This contains the actual text generated in that chunk.

### `end=""`

Prevents Python from moving to a new line after every chunk.

### `flush=True`

Makes the output appear immediately in the terminal.

---

## Simple Example

Without streaming:

```python
response = client.chat.completions.create(
    model=model,
    messages=messages
)

print(response.choices[0].message.content)
```

With streaming:

```python
stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True
)

for chunk in stream:
    content = chunk.choices[0].delta.content

    if content:
        print(content, end="", flush=True)
```

---

## Key Concept

**Streaming does not make the LLM generate the answer differently.**

It changes **how the response is delivered**.

```text
Without Streaming:
Generate → Wait → Receive Complete Answer

With Streaming:
Generate → Receive Chunk → Generate → Receive Chunk → ...
```

---

## Why Streaming is Useful

Streaming is commonly used in:

- Chatbots
- AI assistants
- Coding assistants
- Customer support systems
- Real-time AI applications

It makes the application feel **faster and more responsive**.

---

## Main Takeaway

```text
stream=True
     ↓
Response comes in chunks
     ↓
for chunk in stream
     ↓
Read chunk.choices[0].delta.content
     ↓
Print immediately
```

**One-line definition:**

> Streaming means receiving an LLM's response incrementally, chunk by chunk, instead of waiting for the complete response.
