import React from 'react';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/addTodos';
import TodoList from './components/todoList';
import './App.css';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="app-container">
        <h1>Todo App</h1>
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
