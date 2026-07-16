# Concepts

## Why Embeddings Exist

Computers don't understand words.

They understand numbers.

The challenge is converting language into numbers while preserving meaning.

---

## One-Hot Encoding

Every word receives a unique vector.

Problem:

All words are equally distant from each other.

---

## Bag of Words

Represents a document using word frequencies.

Problem:

Ignores word order and semantics.

---

## TF-IDF

Reduces the importance of common words.

Problem:

Still based only on frequency.

---

## Co-occurrence

Words that appear together frequently are likely to have similar meanings.

This idea is known as the **Distributional Hypothesis**:

> "You shall know a word by the company it keeps."

---

## Embeddings

Embeddings compress high-dimensional word statistics into dense vectors while preserving semantic relationships.

---

## Cosine Similarity

Instead of comparing vector lengths, AI systems compare the angle between vectors.

Smaller angle ⇒ More similar meaning.

---

## Real World Usage

Embeddings power:

- Semantic Search
- Vector Databases
- Recommendation Systems
- AI Agents
- RAG
- ChatGPT Memory