import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-2xl">
            <TodoForm />
            <TodoFilters />
            <TodoList />
          </main>
          <Footer />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;