// src/TodoContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Todo } from '../types';

type State = {
    todos: Todo[];
};

type Action =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number };

const initialState: State = {
    todos: [],
};

const TodoContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: Todo = {
                id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1,
                text: action.text,
                completed: false,
            };
            return { ...state, todos: [...state.todos, newTodo] };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);
