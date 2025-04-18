import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Todo, TodoFilter, PriorityFilter } from '../types';

interface TodoState {
  todos: Todo[];
  todoFilter: TodoFilter;
  priorityFilter: PriorityFilter;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_TODO_FILTER'; payload: TodoFilter }
  | { type: 'SET_PRIORITY_FILTER'; payload: PriorityFilter }
  | { type: 'REORDER_TODOS'; payload: Todo[] };

interface TodoContextType extends TodoState {
  addTodo: (text: string, priority: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  setTodoFilter: (filter: TodoFilter) => void;
  setPriorityFilter: (filter: PriorityFilter) => void;
  reorderTodos: (todos: Todo[]) => void;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_TODO_FILTER':
      return {
        ...state,
        todoFilter: action.payload,
      };
    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        priorityFilter: action.payload,
      };
    case 'REORDER_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    todoFilter: 'all',
    priorityFilter: 'all',
  });

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'REORDER_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  // Helper function to generate a unique ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Filter todos based on current filters
  const filteredTodos = state.todos.filter(todo => {
    const matchesStatusFilter =
      state.todoFilter === 'all' ||
      (state.todoFilter === 'active' && !todo.completed) ||
      (state.todoFilter === 'completed' && todo.completed);

    const matchesPriorityFilter =
      state.priorityFilter === 'all' || todo.priority === state.priorityFilter;

    return matchesStatusFilter && matchesPriorityFilter;
  });

  // Context actions
  const addTodo = (text: string, priority: Todo['priority']) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const updateTodo = (todo: Todo) => {
    dispatch({ type: 'UPDATE_TODO', payload: todo });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const setTodoFilter = (filter: TodoFilter) => {
    dispatch({ type: 'SET_TODO_FILTER', payload: filter });
  };

  const setPriorityFilter = (filter: PriorityFilter) => {
    dispatch({ type: 'SET_PRIORITY_FILTER', payload: filter });
  };

  const reorderTodos = (todos: Todo[]) => {
    dispatch({ type: 'REORDER_TODOS', payload: todos });
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        setTodoFilter,
        setPriorityFilter,
        reorderTodos,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};