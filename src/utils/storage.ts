import { Columns, Task, TaskStatus } from '../types';

const STORAGE_KEY = 'react-kanban-board';

const defaultColumns: Columns = {
  todo: { id: 'todo', title: '📋 To Do', tasks: [] },
  in_progress: { id: 'in_progress', title: '🔄 In Progress', tasks: [] },
  done: { id: 'done', title: '✅ Done', tasks: [] },
};

export function loadBoard(): Columns {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Ensure all columns exist
      const columns = { ...defaultColumns, ...parsed };
      return columns;
    }
  } catch {
    console.warn('Failed to load board from localStorage');
  }
  return defaultColumns;
}

export function saveBoard(columns: Columns): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  } catch {
    console.warn('Failed to save board to localStorage');
  }
}

export function generateId(): string {
  return crypto.randomUUID?.() || Math.random().toString(36).substr(2, 9);
}
