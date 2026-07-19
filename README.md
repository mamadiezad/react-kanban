# React Kanban Board — Drag & Drop Task Management 📌

> Beautiful **Kanban board** built with **React**, **TypeScript**, and **@dnd-kit**. Features smooth **drag & drop**, **local storage** persistence, **task management**, and a modern **dark theme**.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vite.dev)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖱️ **Drag & Drop** | Smooth, accessible drag & drop powered by @dnd-kit |
| 📋 **3 Columns** | To Do → In Progress → Done workflow |
| 💾 **Local Storage** | Data persists automatically across sessions |
| ➕ **Add / Edit / Delete** | Full CRUD for tasks with modal forms |
| 🏷️ **Priority Tags** | Low (green), Medium (orange), High (red) |
| 🌙 **Dark Theme** | Modern, eye-friendly dark UI |
| 📱 **Responsive** | Works perfectly on desktop & mobile |
| ⌨️ **Keyboard Accessible** | Full keyboard navigation support |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI component library |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool & dev server |
| **@dnd-kit** | Drag & drop library |
| **UUID** | Unique task identifiers |
| **CSS** | Modern inline styles |

---

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/mamadiezad/react-kanban.git
cd react-kanban
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx      # Main board with drag context
│   ├── KanbanColumn.tsx     # Droppable column component
│   ├── KanbanCard.tsx       # Draggable task card
│   ├── AddTaskModal.tsx     # Add / edit task modal
│   └── PriorityTag.tsx      # Priority badge component
├── hooks/
│   └── useKanbanBoard.ts    # State management hook
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   └── storage.ts           # Local storage utilities
├── App.tsx                  # Root component
├── App.css                  # App styles
└── main.tsx                 # Entry point
```

---

## 🎯 Usage

```tsx
import { KanbanBoard } from './components/KanbanBoard';

function App() {
  return <KanbanBoard />;
}
```

The board automatically loads from `localStorage`. Add tasks using the **"+ Add Task"** button, drag cards between columns, and manage your workflow visually.

---

## 🧪 Features in Detail

### Drag & Drop
- Cards can be dragged between any columns
- Drag overlay shows the card while moving
- Visual feedback on droppable areas (highlighted border)
- Smooth animations with @dnd-kit presets

### Task Management
- **Create**: Set title, description, priority, and initial status
- **Edit**: Double-click or click edit icon to modify task
- **Delete**: Remove tasks with delete button
- **Move**: Drag cards or use status dropdown

### Data Persistence
- All data stored in browser's localStorage
- Survives page refreshes and browser restarts
- JSON serialization with automatic loading

---

## 🔗 Related Projects

- [FastAPI Tasks](https://github.com/mamadiezad/fastapi-tasks) — REST API backend for task management
- [Next.js Portfolio](https://github.com/mamadiezad/nextjs-portfolio) — Personal portfolio website
- [TS Design Patterns](https://github.com/mamadiezad/ts-design-patterns) — Design patterns in TypeScript

---

## 📄 License

**MIT** — Free for personal and commercial use.

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/mamadiezad">Mohammad</a></sub>
</p>
