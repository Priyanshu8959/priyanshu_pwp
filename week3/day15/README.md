# RAG Knowledge Filter

A basic Retrieval-Augmented Generation (RAG) system using Qdrant, Sentence Transformers, and Groq LLM.

## Tech Stack

- Python
- Qdrant Cloud
- Sentence Transformers
- Groq LLM
- JSON
- python-dotenv

## Workflow

Knowledge JSON → Text Embeddings → Qdrant Vector Database → Semantic Search → Retrieved Context → Groq LLM → Answer

## Features

- Converts documents into vector embeddings.
- Stores embeddings and metadata in Qdrant.
- Performs semantic search.
- Supports category-based filtering.
- Generates context-based answers using Groq LLM.

## Setup

### 1. Install Dependencies

```bash
uv add qdrant-client sentence-transformers groq python-dotenv
```

### 2. Configure Environment Variables

Create a `.env` file:

```env
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GROQ_API_KEY=your_groq_api_key
```

### 3. Add Knowledge Data

Create a `knowledge.json` file containing documents with `text` and `category` fields.

Example:

```json
{
  "text": "Employees receive paid vacation days.",
  "category": "leave"
}
```

### 4. Run the Project

```bash
uv run python main.py
```

## Important Notes

- The embedding size is 384 and must match the Qdrant collection configuration.
- The script recreates the collection when executed.
- Metadata filters must match the document categories.
- The LLM generates answers using retrieved context.
- This is a basic RAG implementation and is not production-ready.
