# Qdrant RAG Pipeline

A simple Retrieval-Augmented Generation (RAG) pipeline using Sentence Transformers for embeddings, Qdrant for vector search, and Groq for generating the final answer.

## Tech Stack

- Python
- Sentence Transformers
- Qdrant Cloud
- Groq API
- `all-MiniLM-L6-v2` embedding model
- `openai/gpt-oss-120b` LLM

## How It Works

The pipeline works in 5 main steps:

### 1. Load Documents

The project reads information from `knowledge.txt`.

Each non-empty line is treated as one document.

```text
knowledge.txt
    ↓
6 documents
```

### 2. Create Embeddings

`all-MiniLM-L6-v2` converts each document into a vector of 384 numbers.

```text
Text
 ↓
Embedding Model
 ↓
384-dimensional vector
```

Embeddings allow the system to compare the meaning of text instead of just matching keywords.

### 3. Store in Qdrant

The embeddings are uploaded to a Qdrant collection called `knowledge`.

Qdrant stores:

- Vector
- Document text
- Document ID

The collection uses:

```text
Vector size: 384
Distance: COSINE
```

### 4. Search Relevant Information

When a user asks a question, the question is also converted into a 384-dimensional vector.

Qdrant compares the question vector with stored vectors using cosine similarity.

The top 3 most relevant documents are returned.

```text
Question
   ↓
Embedding
   ↓
Qdrant Search
   ↓
Top 3 Relevant Documents
```

### 5. Generate Final Answer

The retrieved documents are combined into a `context`.

The question and context are sent to the Groq LLM.

The LLM generates the final answer using the retrieved information.

```text
Question + Context
       ↓
     Groq LLM
       ↓
   Final Answer
```

## Complete RAG Flow

```text
knowledge.txt
      ↓
Documents
      ↓
Embeddings
      ↓
Qdrant
      ↓
Semantic Search
      ↓
Relevant Context
      ↓
Groq LLM
      ↓
Final Answer
```

## Example

Question:

```text
How many vacation days do I get?
```

Qdrant retrieves:

```text
Employees receive 24 days of paid leave per year
```

The retrieved information is sent to the LLM.

Final answer:

```text
You get 24 days of paid leave per year.
```

## Project Structure

```text
day14/
│
├── qdrant_day14.py
├── knowledge.txt
├── .env
└── .venv/
```

## Environment Variables

Create a `.env` file:

```text
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GROQ_API_KEY=your_groq_api_key
```

## Run

```bash
python qdrant_day14.py
```

## Key Concepts

- Embeddings convert text into numerical vectors.
- Qdrant stores and searches vectors.
- Cosine similarity finds semantically similar information.
- Retrieval finds relevant context.
- Groq LLM generates the final response.
- RAG combines retrieval with generation.
