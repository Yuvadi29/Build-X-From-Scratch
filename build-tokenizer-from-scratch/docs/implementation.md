# Implementation

## Step 1 — Buffer Tokenizer

Goal

Understand how computers store text.

Topics

- UTF-8
- Buffer
- Bytes

Output


Hello

↓

72 101 108 108 111


---

## Step 2 — Character Tokenizer

Goal

Split text into characters.

Output


Hello

↓

H e l l o


---

## Step 3 — Count Adjacent Pairs

Goal

Find the most common neighboring symbols.

Example


lower

↓

l o
o w
w e
e r


---

## Step 4 — Merge Pairs

Goal

Merge the most frequent pair into a new symbol.

Example


l o

↓

lo


---

## Step 5 — Train Vocabulary

Repeat pair counting and merging until the desired vocabulary is created.

---

## Step 6 — Tokenize New Text

Apply the learned merge rules to unseen text.

Example


lower

↓

low er


---

## Final Result

You now have a simplified Byte Pair Encoding tokenizer capable of learning merge rules from a corp