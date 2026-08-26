# Day 12 — Sentence Embeddings and Cosine Similarity

## Objective

Learn how to convert text into numerical vectors using `SentenceTransformer` and compare the semantic similarity between two sentences using cosine similarity.

## Step 1: Install Required Packages

First, install `sentence-transformers` and `numpy`:

```bash
uv add numpy sentence-transformers
```

Important: The correct package name is:

```text
sentence-transformers
```

The correct Python import is:

```python
from sentence_transformers import SentenceTransformer
```

## Step 2: Load the Sentence Transformer Model

Use the `all-MiniLM-L6-v2` model:

```python
model = SentenceTransformer("all-MiniLM-L6-v2")
```

This model converts sentences into embedding vectors.

## Step 3: Convert Sentences into Embeddings

```python
v1 = model.encode(t1)
v2 = model.encode(t2)
```

Each sentence is converted into a numerical vector.

## Step 4: Calculate Cosine Similarity

```python
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
```

Then:

```python
print(cosine_similarity(v1, v2))
```

Cosine similarity measures how similar the meanings of two sentences are.

## Complete Code

```python
import numpy as np
from sentence_transformers import SentenceTransformer


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


model = SentenceTransformer("all-MiniLM-L6-v2")

t1 = "I love programming in Python"
t2 = "I really enjoy coding in Python"

v1 = model.encode(t1)
v2 = model.encode(t2)

print(cosine_similarity(v1, v2))
```

## Key Points

- `sentence-transformers` converts text into embeddings.
- `SentenceTransformer` loads the embedding model.
- `model.encode()` converts sentences into vectors.
- Cosine similarity compares the vectors.
- Similar meanings generally produce higher similarity.
- Different meanings generally produce lower similarity.

## Important Corrections

Use:

```python
from sentence_transformers import SentenceTransformer
```

Not:

```python
from sentence_tranformers import SentenceTransformer
```

Use:

```python
np.linalg.norm(b)
```

Not:

```python
np.linag.norm(b)
```

## Learning Outcome

By the end of Day 12, you should understand the basic pipeline:

```text
Sentence
   ↓
Sentence Transformer
   ↓
Embedding Vector
   ↓
Cosine Similarity
   ↓
Similarity Score
```
