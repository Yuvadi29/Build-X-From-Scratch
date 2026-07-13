# Architecture

## High-Level Pipeline

Input Text
      │
      ▼
Buffer Encoding
      │
      ▼
Character Split
      │
      ▼
Pair Frequency
      │
      ▼
Merge Training
      │
      ▼
Vocabulary
      │
      ▼
Tokenizer
      │
      ▼
Final Tokens

## Training Pipeline
Corpus

↓

Characters

↓

Count Adjacent Pairs

↓

Most Frequent Pair

↓

Merge

↓

Repeat

↓

Vocabulary

## Runtime Pipeline
Input

↓

Characters

↓

Apply Merge Rules

↓

Tokens