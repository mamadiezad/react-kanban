import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { AddTaskModal } from './AddTaskModal';
import { useKanbanBoard } from '../hooks/useKanbanBoard';
import { Task, TaskPriority, TaskStatus } from '../types';

export function KanbanBoard() {
  const { columns, addTask, deleteTask, updateTask, moveTask, reorderTasks } = useKanbanBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    for (const col of Object.values(columns)) {
      const task = col.tasks.find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which columns active and over belong to
    let activeCol: TaskStatus | null = null;
    let overCol: TaskStatus | null = null;
    let activeIndex = -1;
    let overIndex = -1;

    for (const [status, col] of Object.entries(columns)) {
      const idx = col.tasks.findIndex((t) => t.id === activeId);
      if (idx !== -1) {
        activeCol = status as TaskStatus;
        activeIndex = idx;
      }
      const idx2 = col.tasks.findIndex((t) => t.id === overId);
      if (idx2 !== -1) {
        overCol = status as TaskStatus;
        overIndex = idx2;
      }
    }

    // If over is a column (dropped on empty area), move there
    if (!overCol && Object.keys(columns).includes(overId as string)) {
      moveTask(activeId, overId as TaskStatus);
      return;
    }

    if (activeCol && overCol) {
      if (activeCol === overCol) {
        // Same column - reorder
        if (activeIndex !== overIndex) {
          const newTasks = arrayMove(columns[activeCol].tasks, activeIndex, overIndex);
          columns[activeCol].tasks = newTasks;
          reorderTasks(activeCol, activeIndex, overIndex);
        }
      } else {
        // Different column - move
        moveTask(activeId, overCol);
      }
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddOrUpdate = (
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus
  ) => {
    if (editingTask) {
      updateTask(editingTask.id, { title, description, priority, status });
      setEditingTask(null);
    } else {
      addTask(title, description, priority, status);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#e0e0e0', fontSize: '28px', fontWeight: 700 }}>
            Kanban Board
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6a6a7a', fontSize: '14px' }}>
            Drag & drop tasks to manage your workflow
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: '#7c3aed',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          + Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
          {Object.values(columns).map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDeleteTask={deleteTask}
              onEditTask={handleEdit}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div
              style={{
                backgroundColor: '#1e1e2e',
                border: '1px solid #7c3aed',
                borderRadius: '10px',
                padding: '14px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                width: '280px',
              }}
            >
              <h4 style={{ margin: 0, color: '#e0e0e0', fontSize: '15px' }}>{activeTask.title}</h4>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddOrUpdate}
      />
    </div>
  );
}
