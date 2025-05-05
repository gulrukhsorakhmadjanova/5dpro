'use client'
import { useState, useEffect } from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Theme = {
  bgColor: string;
  textColor: string;
  name: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState<Theme>({
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-900',
    name: 'light'
  });

  // Available themes
  const themes: Theme[] = [
    { bgColor: 'bg-gray-50', textColor: 'text-gray-900', name: 'light' },
    { bgColor: 'bg-gray-900', textColor: 'text-gray-50', name: 'dark' },
    { bgColor: 'bg-blue-50', textColor: 'text-blue-900', name: 'blue' },
    { bgColor: 'bg-red-50', textColor: 'text-red-900', name: 'red' },
    { bgColor: 'bg-green-50', textColor: 'text-green-900', name: 'green' },
  ];

  // Auto-contrast text color
  const getContrastColor = (bgColor: string) => {
    return bgColor.includes('900') ? 'text-gray-50' : 'text-gray-900';
  };

  // Change theme
  const changeTheme = (theme: Theme) => {
    setCurrentTheme({
      ...theme,
      textColor: getContrastColor(theme.bgColor) // Auto-adjust text for contrast
    });
  };

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  // Toggle completion
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className={`min-h-screen p-8 ${currentTheme.bgColor} ${currentTheme.textColor} transition-colors duration-300`}>
      <div className={`max-w-md mx-auto rounded-lg shadow p-6 ${currentTheme.bgColor.includes('900') ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Todo List</h1>
          <div className="flex space-x-2">
            {themes.map(theme => (
              <button
                key={theme.name}
                onClick={() => changeTheme(theme)}
                className={`w-6 h-6 rounded-full ${theme.bgColor} border-2 ${currentTheme.name === theme.name ? 'border-black dark:border-white' : 'border-transparent'}`}
                aria-label={`${theme.name} theme`}
              />
            ))}
          </div>
        </div>

        {/* Add Task Input */}
        <div className="flex mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className={`flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 ${currentTheme.textColor} ${
              currentTheme.bgColor.includes('900') 
                ? 'bg-gray-700 border-gray-600 focus:ring-blue-400' 
                : 'bg-white border-gray-300 focus:ring-blue-500'
            }`}
          />
          <button
            onClick={addTodo}
            className={`px-4 py-2 rounded-r-lg ${
              currentTheme.bgColor.includes('900') 
                ? 'bg-blue-400 hover:bg-blue-500' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-4 opacity-70">No tasks yet. Add one above!</li>
          ) : (
            todos.map(todo => (
              <li 
                key={todo.id} 
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  currentTheme.bgColor.includes('900') 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={`h-5 w-5 rounded mr-3 ${
                      currentTheme.bgColor.includes('900') 
                        ? 'accent-blue-400' 
                        : 'accent-blue-500'
                    }`}
                  />
                  <span className={`${todo.completed ? 'line-through opacity-60' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`${
                    currentTheme.bgColor.includes('900') 
                      ? 'text-red-400 hover:text-red-300' 
                      : 'text-red-500 hover:text-red-700'
                  }`}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-4 text-sm opacity-70">
            {todos.filter(t => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </main>
  );
}