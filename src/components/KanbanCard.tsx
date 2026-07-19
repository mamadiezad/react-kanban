import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types';
import { PriorityTag } from './PriorityTag';

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function KanbanCard({ task, onDelete, onEdit }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    backgroundColor: '#1e1e2e',
    border: '1px solid #313244',
    borderRadius: '10px',
    padding: '14px',
    cursor: 'grab',
    touchAction: 'none',
    boxShadow: isDragging ? '0 8px 30px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.15)',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <PriorityTag priority={task.priority} />
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            style={actionBtnStyle}
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            style={actionBtnStyle}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
      <h4 style={{ margin: '0 0 6px', color: '#e0e0e0', fontSize: '15px', fontWeight: 600 }}>
        {task.title}
      </h4>
      {task.description && (
        <p style={{ margin: '0', color: '#a0a0b0', fontSize: '13px', lineHeight: '1.4' }}>
          {task.description}
        </p>
      )}
    </div>
  );
}

const actionBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '2px',
  opacity: 0.6,
};
