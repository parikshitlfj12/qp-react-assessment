// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../../types';
import { useTodos } from '../../context/TodoContext';

const TodoItem: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
    const { dispatch } = useTodos();

    const toggleTodo = () => {
        dispatch({ type: 'TOGGLE_TODO', id: todo.id });
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleTodo}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
        </div>
    );
});

export default TodoItem;
