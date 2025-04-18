import React from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '../context/TodoContext';
import { ClipboardList } from 'lucide-react';

const TodoList: React.FC = () => {
  const { filteredTodos } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ClipboardList className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">No tasks found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Add a new task or try changing your filters
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;