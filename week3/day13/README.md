# Simple RAG

A simple Retrieval-Augmented Generation (RAG) system using Sentence Transformers, cosine similarity, and Groq LLM.

## Tech Stack

- Python
- Sentence Transformers
- NumPy
- Groq API

## How It Works

1. Convert documents into embeddings.
2. Convert the user query into an embedding.
3. Find the most similar document using cosine similarity.
4. Send the retrieved context to the LLM.
5. Generate the final answer.

## Setup

```bash
pip install -r requirements.txt
```

Add your Groq API key to `.env`:

```env
GROQ_API_KEY=your_api_key
```

Run:

```bash
python main.py
```
