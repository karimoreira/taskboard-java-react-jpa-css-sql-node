import axios from 'axios';
import { Task, TaskRequest, TaskStatus } from '../types/Task';

const api = axios.create({
  baseURL: '/api/tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('');
    return response.data;
  },

  getByStatus: async (status: TaskStatus): Promise<Task[]> => {
    const response = await api.get<Task[]>('', { params: { status } });
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/${id}`);
    return response.data;
  },

  create: async (task: TaskRequest): Promise<Task> => {
    const response = await api.post<Task>('', task);
    return response.data;
  },

  update: async (id: number, task: TaskRequest): Promise<Task> => {
    const response = await api.put<Task>(`/${id}`, task);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};

