import { useState, useEffect } from 'react';
import { FiCreditCard, FiX } from 'react-icons/fi';
import {
  Task,
  TaskRequest,
  TaskStatus,
  TaskPriority,
  statusLabels,
  priorityLabels,
} from '../types/Task';

interface TaskModalProps {
  isOpen: boolean;
  task?: Task | null;
  initialStatus?: TaskStatus;
  onSave: (data: TaskRequest, id?: number) => Promise<void>;
  onClose: () => void;
}

function TaskModal({ isOpen, task, initialStatus, onSave, onClose }: TaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isEditing = !!task;

  const [formData, setFormData] = useState<TaskRequest>({
    title: '',
    description: '',
    status: initialStatus || TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: initialStatus || TaskStatus.PENDING,
        priority: TaskPriority.MEDIUM,
      });
    }
    setErrors({});
  }, [task, initialStatus, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'O titulo e obrigatorio';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Minimo de 3 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave(formData, task?.id);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const columnLabel = statusLabels[formData.status];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__header-icon">
            <FiCreditCard />
          </div>
          <div className="modal__header-content">
            <h2>{isEditing ? 'Editar Card' : 'Novo Card'}</h2>
            <p>na lista <strong>{columnLabel}</strong></p>
          </div>
          <button className="modal__close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal__body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Titulo</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Digite o titulo do card"
                autoFocus
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Descricao</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Adicione uma descricao mais detalhada..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Lista</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {Object.values(TaskStatus).map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Prioridade</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {Object.values(TaskPriority).map((p) => (
                    <option key={p} value={p}>
                      {priorityLabels[p]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--solid" disabled={loading}>
                {loading ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar Card'}
              </button>
              <button type="button" className="btn btn--outline" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;

