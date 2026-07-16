# Architecture

## High Level Flow

```
Input Documents
        │
        ▼
One-Hot Encoding
        │
        ▼
Bag of Words
        │
        ▼
TF-IDF
        │
        ▼
Co-occurrence Matrix
        │
        ▼
Dense Embeddings
        │
        ▼
Cosine Similarity
        │
        ▼
Embedding Space
```

## Components

- Input
- One-Hot Encoder
- Bag of Words Generator
- TF-IDF Calculator
- Co-occurrence Matrix Builder
- Embedding Generator
- Cosine Similarity Calculator
- Embedding Visualizer

## Data Flow

Documents

↓

Vocabulary

↓

Word Statistics

↓

Dense Vectors

↓

Similarity Search