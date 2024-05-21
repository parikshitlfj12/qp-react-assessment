// NOTE: Here I am considering that the context is basically my database,
// from which I'll be fetching data based on pagination so as to make it optimised

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { Todo } from '../types';
import { getTodoData } from '../services/getTodoData';

type State = {
    todos: Todo[];
    page: number;
    pageSize: number;
    totalItems: number;
};

type Action =
    | { type: 'ADD_TODO'; text: string }
    | { type: 'TOGGLE_TODO'; id: number }
    | { type: 'SET_TODOS'; todos: Todo[]; totalItems: number }
    | { type: 'SET_PAGE'; page: number }
    | { type: 'SET_TOTAL_ITEMS'; totalItems: number };

const initialState: State = {
    todos: [],
    page: 1,
    pageSize: 10,
    totalItems: 0
};

type TodoContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
    getPageTodos: (page: number) => Todo[];
};

const TodoContext = createContext<TodoContextType>({
    state: initialState,
    dispatch: () => null,
    getPageTodos: () => []
});

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: Todo = {
                id: state.todos.length + 1,
                text: action.text,
                completed: false,
            };
            return {
                ...state,
                todos: [newTodo, ...state.todos],
                totalItems: state.totalItems + 1,
                page: 1
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        case 'SET_TODOS':
            return { ...state, todos: action.todos, totalItems: action.totalItems };
        case 'SET_PAGE':
            return { ...state, page: action.page };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        const fetchTodos = async () => {
            const todosData = await getTodoData();
            dispatch({ type: 'SET_TODOS', todos: todosData?.todos, totalItems: todosData.totalItems });
        };
        fetchTodos();
    }, []);

    const getPageTodos = (page: number): Todo[] => {
        const startIndex = (page - 1) * state.pageSize;
        const endIndex = startIndex + state.pageSize;
        return state.todos.slice(startIndex, endIndex);
    };

    return (
        <TodoContext.Provider value={{ state, dispatch, getPageTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);
