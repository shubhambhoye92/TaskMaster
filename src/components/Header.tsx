import React from 'react';
import { CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <CheckSquare className="h-6 w-6 text-indigo-500 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">TaskMaster</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;