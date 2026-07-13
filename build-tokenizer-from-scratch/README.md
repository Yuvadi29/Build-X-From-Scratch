# 🚀 Build Tokenizer From Scratch

Learn how Large Language Models like ChatGPT convert human-readable text into tokens by building your own tokenizer from first principles.

This project is part of the **Build X From Scratch** series by Coding Adda.

---

# 🎯 Goal

Most developers know that LLMs use tokens.

Very few understand:

- Why tokenization exists
- Why bytes aren't enough
- How Byte Pair Encoding works
- How GPT tokenizers are trained

In this project, we'll build a simplified Byte Pair Encoding (BPE) tokenizer to understand the core ideas behind modern LLM tokenization.

---

# 🧠 Learning Outcomes

By the end of this project, you'll understand:

- UTF-8 encoding
- Byte representation
- Character tokenization
- Byte Pair Encoding (BPE)
- Vocabulary generation
- Merge rules
- Tokenization using trained merges

---

# 📚 Documentation

| Document | Description |
|----------|-------------|
| [Concepts](./docs/concepts.md) | Why tokenizers exist and how they evolved |
| [Architecture](./docs/architecture.md) | System architecture and data flow |
| [Implementation](./docs/implementation.md) | Step-by-step implementation guide |

---

# 🛠 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

---

# 📂 Project Structure

```text
components/
lib/
docs/
types/