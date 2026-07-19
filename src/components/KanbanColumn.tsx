import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column as ColumnType, Task } from '../types';
import { KanbanCard } from './KanbanCard';

interface Props {
  column: ColumnType;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function KanbanColumn({ column, onDeleteTask, onEditTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const columnStyle: React.CSSProperties = {
    backgroundColor: isOver ? '#1a1a2e' : '#151525',
    borderRadius: '12px',
    padding: '16px',
    minHeight: '200px',
    width: '320px',
    flexShrink: 0,
    border: isOver ? '2px solid #7c3aed' : '2px solid transparent',
    transition: 'all 0.2s ease',
  };

  const headerColors: Record<string, string> = {
    todo: '#f59e0b',
    in_progress: '#3b82f6',
    done: '#22c55e',
  };

  return (
    <div style={columnStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: `2px solid ${headerColors[column.id]}40` }}>
        <h3 style={{ margin: 0, color: '#e0e0e0', fontSize: '16px', fontWeight: 600 }}>
          {column.title}
        </h3>
        <span
          style={{
            backgroundColor: '#1e1e2e',
            color: '#a0a0b0',
            borderRadius: '20px',
            padding: '2px 10px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {column.tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '100px' }}>
        <SortableContext items={column.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </SortableContext>

        {column.tasks.length === 0 && (
          <div
            style={{
              color: '#4a4a5a',
              textAlign: 'center',
              padding: '30px 20px',
              fontSize: '13px',
              border: '2px dashed #2a2a3a',
              borderRadius: '10px',
            }}
          >
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
