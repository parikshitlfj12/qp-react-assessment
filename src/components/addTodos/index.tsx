import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext';
import './addTodos.css';

const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const { dispatch } = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch({ type: 'ADD_TODO', text });
            setText('');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                className="input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="button" type="submit">
                Add Todo
            </button>
        </form>
    );
};

export default AddTodo;
