// src/components/TodoList.tsx
import React from 'react';
import { useTodos } from '../../context/TodoContext';
import TodoItem from '../todoItems';

const TodoList: React.FC = () => {
    const { state } = useTodos();

    return (
        <div>
            {state.todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
