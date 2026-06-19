# Concepts

## Why Git Exists

Before Git, tracking file changes was difficult and error-prone.

Developers often created copies such as:

```txt
project-final.zip
project-final-v2.zip
project-final-final.zip
```

Git solved this problem by introducing version control.

---

## Content Addressing

Traditional systems identify files by name.

Git identifies files by content.

```txt
Content
   ↓
SHA-1
   ↓
Hash
```

---

## Objects

Git stores objects rather than files.

Each object is uniquely identified by its hash.

```txt
hash -> content
```

---

## Commits

A commit is a snapshot of the repository.

A commit contains:

* Message
* Timestamp
* Parent Commit
* File References

---

## Commit History

Commits form a linked list.

```txt
Commit C
   ↓
Commit B
   ↓
Commit A
```
---