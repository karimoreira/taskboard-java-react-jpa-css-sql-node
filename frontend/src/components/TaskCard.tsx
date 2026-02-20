import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiArrowRight, FiClock, FiAlignLeft } from 'react-icons/fi';
import { Task, TaskStatus, priorityLabels, statusLabels } from '../types/Task';

interface KanbanCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, newStatus: TaskStatus) => void;
}

function KanbanCard({ task, onEdit, onDelete, onMove }: KanbanCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const moveMenuRef = useRef<HTMLDivElement>(null);
  const priorityClass = task.priority.toLowerCase();
  const isCompleted = task.status === TaskStatus.COMPLETED;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moveMenuRef.current && !moveMenuRef.current.contains(e.target as Node)) {
        setShowMoveMenu(false);
      }
    };
    if (showMoveMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMoveMenu]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const otherStatuses = Object.values(TaskStatus).filter((s) => s !== task.status);

  return (
    <div
      className={`kanban-card ${isCompleted ? 'kanban-card--completed' : ''}`}
      onClick={() => onEdit(task)}
    >
      <div className="kanban-card__labels">
        <div className={`kanban-card__label kanban-card__label--${priorityClass}`}>
          <span className="kanban-card__label-text">
            {priorityLabels[task.priority]}
          </span>
        </div>
      </div>

      <div className="kanban-card__title">{task.title}</div>

      {task.description && (
        <div className="kanban-card__description">{task.description}</div>
      )}

      <div className="kanban-card__footer">
        <div className="kanban-card__meta">
          <span className="kanban-card__meta-item">
            <FiClock />
            {formatDate(task.createdAt)}
          </span>
          {task.description && (
            <span className="kanban-card__meta-item">
              <FiAlignLeft />
            </span>
          )}
        </div>
      </div>

      <div className="kanban-card__actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="kanban-card__action-btn"
          title="Editar"
          onClick={() => onEdit(task)}
        >
          <FiEdit2 size={13} />
        </button>
        <div style={{ position: 'relative' }} ref={moveMenuRef}>
          <button
            className="kanban-card__action-btn kanban-card__action-btn--move"
            title="Mover"
            onClick={() => setShowMoveMenu(!showMoveMenu)}
          >
            <FiArrowRight size={13} />
          </button>
          {showMoveMenu && (
            <div className="move-menu">
              {otherStatuses.map((status) => (
                <button
                  key={status}
                  className="move-menu__item"
                  onClick={() => {
                    onMove(task.id, status);
                    setShowMoveMenu(false);
                  }}
                >
                  <span
                    className={`kanban-column__dot kanban-column__dot--${status.toLowerCase().replace('_', '-')}`}
                  />
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="kanban-card__action-btn kanban-card__action-btn--danger"
          title="Excluir"
          onClick={() => onDelete(task.id)}
        >
          <FiTrash2 size={13} />
        </button>
      </div>
    </div>
  );
}

export default KanbanCard;
