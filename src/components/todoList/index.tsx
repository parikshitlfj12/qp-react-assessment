import React, { useEffect, useState } from 'react';
import { useTodos } from '../../context/TodoContext';
import TodoItem from '../todoItems';
import './todoList.css';
import { Todo } from '../../types';

const TodoList: React.FC = () => {
    const { state, dispatch, getPageTodos } = useTodos();
    const [todosList, setTodosList] = useState<Todo[]>([]);

    // Visualize this as getting todo's from the API endpoint with given page number
    useEffect(() => {
        const todos = getPageTodos(state.page);
        setTodosList(todos);
    }, [state.page, state.todos]);


    const totalPages = Math.ceil(state.totalItems / state.pageSize);

    const handlePrevPage = () => {
        if (state.page > 1) {
            dispatch({ type: 'SET_PAGE', page: state.page - 1 });
        }
    };

    const handleNextPage = () => {
        if (state.page < totalPages) {
            dispatch({ type: 'SET_PAGE', page: state.page + 1 });
        }
    };

    return (
        <div>
            <div className="list-container">
                {!todosList.length ? (
                    <div className="loader"></div>
                ) : (
                    todosList.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                )}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={state.page === 1}>
                    Previous
                </button>
                <span>{`Page ${state.page} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={state.page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TodoList;
