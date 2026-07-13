# Concepts

## Why Do LLMs Need Tokenizers?

Large Language Models cannot understand text directly.

They only understand numbers.

Before an LLM processes any prompt, the text must first be converted into tokens.

---

## Step 1 — Bytes

Computers store text as bytes.

Example:
Hello

↓

72 101 108 108 111


Although computers understand bytes, using one byte per token is inefficient.

---

## Step 2 — Characters

A simple tokenizer can split text into individual characters.


Hello

↓

H e l l o


This reduces complexity but still creates many tokens.

---

## Step 3 — Byte Pair Encoding

Instead of storing every character separately, BPE repeatedly merges the most frequent adjacent pairs.

Example:


l o w

↓

lo w

↓

low


The tokenizer gradually learns common subwords.

---

## Vocabulary

After training, the tokenizer builds a vocabulary containing the learned subwords.

Examples:

- low
- er
- ing
- tion

---

## Tokenization

When new text arrives, the tokenizer applies the learned merge rules to produce the final sequence of tokens.