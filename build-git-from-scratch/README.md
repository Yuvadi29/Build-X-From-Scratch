# 🚀 Build Git From Scratch

Learn how Git actually works under the hood by building a simplified Git implementation using TypeScript.

> Most developers use Git every day.
>
> Very few understand what happens when they run:
>
> ```bash
> git add .
> git commit -m "message"
> git branch feature
> ```
>
> In this project, we build Git from first principles to understand the core concepts behind modern version control systems.

---

## 🎯 What You'll Learn

By the end of this project, you'll understand:

* How Git identifies files using hashes
* What content addressing means
* How Git stores objects
* How commits work internally
* Why commit history is a linked list

The goal is not to rebuild production Git.

The goal is to understand the ideas that make Git work.

---

## 🛠 Features Implemented

```bash
mygit init
mygit hash hello.txt
mygit add hello.txt
mygit commit "Initial Commit"
mygit log
```

---

## 📚 Documentation

This project is designed to be learned through documentation as well as code.

| Document                                   | Description                                                |
| ------------------------------------------ | ---------------------------------------------------------- |
| [Concepts](./docs/concepts.md)             | Core Git concepts, mental models, and why Git exists       |
| [Architecture](./docs/architecture.md)     | Repository structure, data flow, and internal architecture |
| [Implementation](./docs/implementation.md) | Step-by-step implementation guide matching the video       |

---

## 🧠 Key Concepts

### Content Addressing

Git identifies files using content rather than filenames.

```txt
Content
   ↓
 SHA-1
   ↓
 Hash
```

---

### Objects

Git stores objects, not files.

```txt
hash
 ↓
content
```

---

### Commits

A commit is a snapshot of the repository.

```txt
Commit
  ↓
Snapshot
```

---

### History

Git history is a linked list.

```txt
Commit C
   ↓
Commit B
   ↓
Commit A
```

---

## 🏗 Project Structure

```txt
build-git-from-scratch/

├── README.md

├── src/
│   ├── commands/
│   ├── core/
│   ├── utils/
│   └── cli.ts

├── docs/
│   ├── architecture.md
│   ├── concepts.md
│   └── implementation.md
```

---

## 🚦 Getting Started

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev -- init
```

Example workflow:

```bash
mygit init

echo "Hello World" > hello.txt

mygit add hello.txt

mygit commit "Initial Commit"

mygit log

mygit branch feature
```

---

## 💡 The Big Idea

Git is fundamentally:

* Hashes
* Objects
* Snapshots
* Pointers

That's it.

Once you understand those four concepts, Git becomes much easier to reason about.

---

## ⭐ Support

If you found this project useful:

* Star the repository
* Share it with other developers

Happy Building 🚀
