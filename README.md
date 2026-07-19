# React Kanban Board 📌

A professional **drag & drop Kanban board** built with **React**, **TypeScript**, and **@dnd-kit**. Features real-time updates, local storage persistence, and a clean modern UI.

## ✨ Features

- ✅ **Drag & Drop** — Smooth, accessible drag & drop between columns
- ✅ **Three Columns** — To Do, In Progress, Done
- ✅ **Local Storage** — Persists data across sessions
- ✅ **Add / Edit / Delete Tasks** — Full CRUD operations
- ✅ **Priority Tags** — Low, Medium, High with color coding
- ✅ **Responsive Design** — Works on desktop & mobile
- ✅ **Dark Theme** — Modern, clean dark UI
- ✅ **Keyboard Accessible** — Full keyboard navigation

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **@dnd-kit** | Drag & drop |
| **CSS Modules** | Scoped styling |

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx    # Main board component
│   ├── KanbanColumn.tsx   # Column with droppable area
│   ├── KanbanCard.tsx     # Draggable task card
│   ├── AddTaskModal.tsx   # Modal for adding/editing tasks
│   └── PriorityTag.tsx    # Priority badge component
├── hooks/
│   └── useKanbanBoard.ts  # Custom hook for state management
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   └── storage.ts         # Local storage utilities
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## 📄 License

MIT
