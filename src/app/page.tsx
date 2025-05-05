"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">To Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task..."
          className="border px-2 py-1 rounded"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-1 rounded">
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span className="mr-4">{todo}</span>
            <button onClick={() => removeTodo(index)} className="text-red-500">✕</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
