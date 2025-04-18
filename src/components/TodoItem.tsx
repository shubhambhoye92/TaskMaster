import React, { useState } from 'react';
import { Check, Edit, Trash, X } from 'lucide-react';
import { Todo } from '../types';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, updateTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editText.trim()) {
      updateTodo({
        ...todo,
        text: editText.trim(),
        priority: editPriority,
      });
      setIsEditing(false);
    }
  };

  const priorityStyles = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <li className="group mb-2 transition-all duration-200 transform hover:-translate-y-1">
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
                className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="flex-1"></div>
              <button
                type="submit"
                className="p-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                  setEditPriority(todo.priority);
                }}
                className="p-1.5 bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 transition-colors duration-200 ${
                todo.completed
                  ? 'bg-indigo-500 border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'border-gray-400 dark:border-gray-500'
              }`}
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed && <Check className="h-full w-full p-px text-white" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 items-center">
                <span
                  className={`text-base ${
                    todo.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                  } transition-all duration-200`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2 mt-2 items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${priorityStyles[todo.priority]}`}>
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                aria-label="Edit task"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                aria-label="Delete task"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;