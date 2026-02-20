import { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { Task, TaskStatus, statusLabels } from '../types/Task';
import KanbanCard from './TaskCard';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onMove: (id: number, newStatus: TaskStatus) => void;
  onQuickAdd: (title: string, status: TaskStatus) => void;
}

function KanbanColumn({ status, tasks, onEdit, onDelete, onMove, onQuickAdd }: KanbanColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const statusClass = status.toLowerCase().replace('_', '-');

  useEffect(() => {
    if (isAdding && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAdding]);

  const handleAdd = () => {
    if (newTitle.trim().length >= 3) {
      onQuickAdd(newTitle.trim(), status);
      setNewTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewTitle('');
    }
  };

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <div className="kanban-column__title">
          <span className={`kanban-column__dot kanban-column__dot--${statusClass}`} />
          <h3>{statusLabels[status]}</h3>
          <span className="kanban-column__count">{tasks.length}</span>
        </div>
      </div>

      <div className="kanban-column__body">
        {tasks.length === 0 && !isAdding && (
          <div className="empty-column">
            <p>Nenhum card aqui</p>
          </div>
        )}
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>

      {isAdding ? (
        <div className="inline-add-form">
          <textarea
            ref={textareaRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o titulo do card..."
          />
          <div className="inline-add-form__actions">
            <button
              className="inline-add-form__btn inline-add-form__btn--add"
              onClick={handleAdd}
              disabled={newTitle.trim().length < 3}
            >
              Adicionar card
            </button>
            <button
              className="inline-add-form__btn inline-add-form__btn--cancel"
              onClick={() => {
                setIsAdding(false);
                setNewTitle('');
              }}
            >
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <button className="kanban-column__add" onClick={() => setIsAdding(true)}>
          <FiPlus size={16} />
          Adicionar um card
        </button>
      )}
    </div>
  );
}

export default KanbanColumn;

