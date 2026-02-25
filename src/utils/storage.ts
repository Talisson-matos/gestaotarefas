import { Task } from '../types';

const STORAGE_KEY = 'kanban_tasks';

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
