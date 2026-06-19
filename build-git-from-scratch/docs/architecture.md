# Architecture

## High-Level Flow

```txt
File
 ↓

Hash
 ↓

Object Store
 ↓

Commit
```

## Repository Structure

```txt
.mygit

├── objects
├── commits
├── refs
│   └── heads
├── index
└── HEAD
```

## Commit Flow

```txt
add
 ↓

index
 ↓

commit
 ↓

HEAD
```

## History Flow

```txt
Commit C
  │
parent
  ▼
Commit B
  │
parent
  ▼
Commit A
```
