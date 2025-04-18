export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

export type Theme = 'light' | 'dark';