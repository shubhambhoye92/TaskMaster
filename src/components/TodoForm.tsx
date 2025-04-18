import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { Todo } from '../types';

const TodoForm: React.FC = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim(), priority);
      setText('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all duration-300"
    >
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value && !isExpanded) {
              setIsExpanded(true);
            }
          }}
          onFocus={() => setIsExpanded(true)}
          className="flex-1 p-2 border-b-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent outline-none text-gray-800 dark:text-gray-200"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="ml-2 p-2 rounded-full bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-indigo-600"
          aria-label="Add task"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 flex items-center gap-4 transition-all duration-300">
          <div className="flex items-center gap-2">
            <label htmlFor="priority" className="text-sm text-gray-600 dark:text-gray-300">
              Priority:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo['priority'])}
              className="p-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-auto text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default TodoForm;