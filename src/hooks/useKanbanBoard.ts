import { useState, useCallback } from 'react';
import { Columns, Task, TaskStatus, TaskPriority } from '../types';
import { loadBoard, saveBoard, generateId } from '../utils/storage';

export function useKanbanBoard() {
  const [columns, setColumns] = useState<Columns>(loadBoard);

  const persist = useCallback((newColumns: Columns) => {
    setColumns(newColumns);
    saveBoard(newColumns);
  }, []);

  const addTask = useCallback(
    (title: string, description: string, priority: TaskPriority, status: TaskStatus) => {
      const newTask: Task = {
        id: generateId(),
        title,
        description,
        status,
        priority,
        createdAt: new Date().toISOString(),
      };
      const newColumns = {
        ...columns,
        [status]: {
          ...columns[status],
          tasks: [...columns[status].tasks, newTask],
        },
      };
      persist(newColumns);
    },
    [columns, persist]
  );

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      const newColumns = { ...columns };
      for (const col of Object.values(newColumns)) {
        const index = col.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          col.tasks[index] = { ...col.tasks[index], ...updates };
          break;
        }
      }
      persist(newColumns);
    },
    [columns, persist]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const newColumns = { ...columns };
      for (const col of Object.values(newColumns)) {
        col.tasks = col.tasks.filter((t) => t.id !== taskId);
      }
      persist(newColumns);
    },
    [columns, persist]
  );

  const moveTask = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      let taskToMove: Task | null = null;
      const newColumns = { ...columns };

      // Find and remove task from current column
      for (const col of Object.values(newColumns)) {
        const index = col.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          taskToMove = col.tasks[index];
          col.tasks = [...col.tasks];
          col.tasks.splice(index, 1);
          break;
        }
      }

      if (taskToMove) {
        newColumns[newStatus] = {
          ...newColumns[newStatus],
          tasks: [...newColumns[newStatus].tasks, { ...taskToMove, status: newStatus }],
        };
        persist(newColumns);
      }
    },
    [columns, persist]
  );

  const reorderTasks = useCallback(
    (status: TaskStatus, fromIndex: number, toIndex: number) => {
      const newColumns = { ...columns };
      const tasks = [...newColumns[status].tasks];
      const [moved] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, moved);
      newColumns[status] = { ...newColumns[status], tasks };
      persist(newColumns);
    },
    [columns, persist]
  );

  return {
    columns,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
  };
}
