import React from 'react';
import { Filter, ArrowDownAZ } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { TodoFilter, PriorityFilter } from '../types';

const TodoFilters: React.FC = () => {
  const { 
    todoFilter, 
    setTodoFilter, 
    priorityFilter, 
    setPriorityFilter, 
    todos,
    filteredTodos 
  } = useTodo();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">Filters</h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredTodos.length} of {todos.length} tasks
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex flex-wrap items-center gap-2 mr-4">
          <button
            onClick={() => setTodoFilter('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              todoFilter === 'all'
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTodoFilter('active')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              todoFilter === 'active'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setTodoFilter('completed')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              todoFilter === 'completed'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ArrowDownAZ className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters;