// src/App.tsx
import React, { useEffect } from 'react';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/addTodos';
import TodoList from './components/todoList';
import { getTodoData } from './services/getTodoData';

const App: React.FC = () => {

  useEffect(() => {
    const fetchData = async () => {
      const dummyTodos = await getTodoData()
      console.log("dummy todos == ", dummyTodos)
    }
    fetchData()
  }, [])

  return (
    <TodoProvider>
      <div className="App">
        <h1>Todo App</h1>
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
