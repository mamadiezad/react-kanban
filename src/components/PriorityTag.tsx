import { TaskPriority } from '../types';

const priorityConfig: Record<TaskPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: '#4caf50' },
  medium: { label: 'Medium', color: '#ff9800' },
  high: { label: 'High', color: '#f44336' },
};

interface Props {
  priority: TaskPriority;
}

export function PriorityTag({ priority }: Props) {
  const config = priorityConfig[priority];
  return (
    <span
      style={{
        backgroundColor: config.color + '22',
        color: config.color,
        border: `1px solid ${config.color}44`,
        borderRadius: '4px',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {config.label}
    </span>
  );
}
