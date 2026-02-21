import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiCircle, FiLoader, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Task, TaskStatus, TaskPriority, TaskRequest } from '../types/Task';
import { taskApi } from '../api/taskApi';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';

function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialStatus, setModalInitialStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAll();
      setTasks(data);
    } catch {
      toast.error('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const columns: Record<TaskStatus, Task[]> = {
    [TaskStatus.PENDING]: tasks.filter((t) => t.status === TaskStatus.PENDING),
    [TaskStatus.IN_PROGRESS]: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    [TaskStatus.COMPLETED]: tasks.filter((t) => t.status === TaskStatus.COMPLETED),
  };

  const handleQuickAdd = async (title: string, status: TaskStatus) => {
    try {
      const newTask = await taskApi.create({
        title,
        description: '',
        status,
        priority: TaskPriority.MEDIUM,
      });
      setTasks((prev) => [newTask, ...prev]);
      toast.success('Card criado!');
    } catch {
      toast.error('Erro ao criar card');
    }
  };

  const handleSave = async (data: TaskRequest, id?: number) => {
    try {
      if (id) {
        const updated = await taskApi.update(id, data);
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        toast.success('Card atualizado!');
      } else {
        const created = await taskApi.create(data);
        setTasks((prev) => [created, ...prev]);
        toast.success('Card criado!');
      }
    } catch {
      toast.error('Erro ao salvar card');
      throw new Error();
    }
  };

  const handleMove = async (id: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );

    try {
      await taskApi.update(id, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      });
      toast.success('Card movido!');
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: task.status } : t))
      );
      toast.error('Erro ao mover card');
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    try {
      await taskApi.delete(deleteTarget);
      setTasks((prev) => prev.filter((t) => t.id !== deleteTarget));
      toast.success('Card excluido!');
    } catch {
      toast.error('Erro ao excluir card');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleEditCard = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreateCard = () => {
    setEditingTask(null);
    setModalInitialStatus(TaskStatus.PENDING);
    setIsModalOpen(true);
  };

  const pendingCount = columns[TaskStatus.PENDING].length;
  const progressCount = columns[TaskStatus.IN_PROGRESS].length;
  const completedCount = columns[TaskStatus.COMPLETED].length;

  if (loading) {
    return (
      <div className="board-loading">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <div className="board-hero">
        <div className="board-hero__left">
          <h1 className="board-hero__title">Minhas tarefas</h1>
          <p className="board-hero__subtitle">
            Organize, priorize e acompanhe seu progresso pessoal
          </p>
        </div>
        <div className="board-hero__right">
          <div className="board-hero__stats">
            <div className="stat-card stat-card--pending">
              <div className="stat-card__icon"><FiCircle size={16} /></div>
              <div className="stat-card__info">
                <span className="stat-card__value">{pendingCount}</span>
                <span className="stat-card__label">Pendentes</span>
              </div>
            </div>
            <div className="stat-card stat-card--progress">
              <div className="stat-card__icon"><FiLoader size={16} /></div>
              <div className="stat-card__info">
                <span className="stat-card__value">{progressCount}</span>
                <span className="stat-card__label">Em progresso</span>
              </div>
            </div>
            <div className="stat-card stat-card--completed">
              <div className="stat-card__icon"><FiCheckCircle size={16} /></div>
              <div className="stat-card__info">
                <span className="stat-card__value">{completedCount}</span>
                <span className="stat-card__label">Concluídas</span>
              </div>
            </div>
          </div>
          <button className="btn btn--create" onClick={handleCreateCard}>
            <FiPlus size={16} />
            Criar Card
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {Object.values(TaskStatus).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={columns[status]}
            onEdit={handleEditCard}
            onDelete={(id) => setDeleteTarget(id)}
            onMove={handleMove}
            onQuickAdd={handleQuickAdd}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        initialStatus={modalInitialStatus}
        onSave={handleSave}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
      />

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Excluir Card"
        message="Tem certeza que deseja excluir este card? Esta acao nao pode ser desfeita."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default HomePage;

