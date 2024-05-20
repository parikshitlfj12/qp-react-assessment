import React, { useState } from 'react';
import { useTodos } from '../../context/TodoContext';

const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const { dispatch } = useTodos();

    const addTodo = () => {
        if (text.trim()) {
            dispatch({ type: 'ADD_TODO', text });
            setText('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
};

export default AddTodo;
