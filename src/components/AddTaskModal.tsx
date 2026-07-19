import { useState } from 'react';
import { TaskPriority, TaskStatus } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, priority: TaskPriority, status: TaskStatus) => void;
}

export function AddTaskModal({ isOpen, onClose, onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority, status);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 20px', color: '#e0e0e0' }}>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Title *</label>
            <input
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              autoFocus
              required
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>Priority</label>
              <select
                style={inputStyle}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select
                style={inputStyle}
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={cancelBtnStyle}>
              Cancel
            </button>
            <button type="submit" style={submitBtnStyle}>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#1e1e2e',
  borderRadius: '12px',
  padding: '28px',
  width: '90%',
  maxWidth: '480px',
  border: '1px solid #313244',
  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  color: '#a0a0b0',
  fontSize: '13px',
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: '#11111b',
  border: '1px solid #313244',
  borderRadius: '8px',
  color: '#e0e0e0',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: 'transparent',
  border: '1px solid #313244',
  borderRadius: '8px',
  color: '#a0a0b0',
  cursor: 'pointer',
  fontSize: '14px',
};

const submitBtnStyle: React.CSSProperties = {
  padding: '10px 24px',
  backgroundColor: '#7c3aed',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};
