import React, { useState } from 'react';
import { Todo } from '../../types';
import { useTodos } from '../../context/TodoContext';
import './todoItems.css';

const TodoItem: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
    const { dispatch } = useTodos();
    const [isOpen, setIsOpen] = useState(false);

    const toggleTodo = () => {
        dispatch({ type: 'TOGGLE_TODO', id: todo.id });
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="item-container">
            <div className="accordion-header" onClick={toggleAccordion}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={toggleTodo}
                    onClick={(e) => e.stopPropagation()}
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                </span>
                <span className="accordion-icon">
                    {isOpen ? '-' : '+'}
                </span>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    <p>{todo.text}</p>
                </div>
            )}
        </div>
    );
});

export default TodoItem;
