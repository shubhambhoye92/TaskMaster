import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 border-t dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>TaskMaster © {new Date().getFullYear()} | Stay Productive</p>
      </div>
    </footer>
  );
};

export default Footer;