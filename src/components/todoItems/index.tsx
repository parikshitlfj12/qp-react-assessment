import React from 'react';
import { Todo } from '../../types';
import { useTodos } from '../../context/TodoContext';
import './todoItems.css';

const TodoItem: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
    const { dispatch } = useTodos();

    const toggleTodo = () => {
        dispatch({ type: 'TOGGLE_TODO', id: todo.id });
    };

    return (
        <div className="item-container">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleTodo}
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
        </div>
    );
});

export default TodoItem;
