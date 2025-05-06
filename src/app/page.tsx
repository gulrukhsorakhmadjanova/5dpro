'use client'
import { useState } from 'react';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Theme = {
  bgColor: string;
  textColor: string;
  name: 'light' | 'dark';
};

export default function TodoApp() {
  const lightTheme: Theme = {
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-900',
    name: 'light'
  };

  const darkTheme: Theme = {
    bgColor: 'bg-gray-900',
    textColor: 'text-gray-50',
    name: 'dark'
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme.name === 'light' ? darkTheme : lightTheme);
  };

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

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className={`min-h-screen p-8 transition-colors duration-300 ${currentTheme.bgColor} ${currentTheme.textColor}`}>
      <div className={`max-w-md mx-auto rounded-lg shadow p-6 ${currentTheme.name === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Todo List</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Change Theme
          </button>
        </div>

        <div className="flex mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className={`flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 ${currentTheme.textColor} ${
              currentTheme.name === 'dark'
                ? 'bg-gray-700 border-gray-600 focus:ring-blue-400'
                : 'bg-white border-gray-300 focus:ring-blue-500'
            }`}
          />
          <button
            onClick={addTodo}
            className={`px-4 py-2 rounded-r-lg ${
              currentTheme.name === 'dark'
                ? 'bg-blue-400 hover:bg-blue-500'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-4 opacity-70">No tasks yet. Add one above!</li>
          ) : (
            todos.map(todo => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  currentTheme.name === 'dark'
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
                      currentTheme.name === 'dark'
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
                    currentTheme.name === 'dark'
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

        {todos.length > 0 && (
          <div className="mt-4 text-sm opacity-70">
            {todos.filter(t => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </main>
  );
}
