import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Todo {
    id: string
    text: string
    completed: boolean
    createdAt: number
    updatedAt: number
}

export type TodoFilter = 'all' | 'completed' | 'active'

interface TodoState {
    items: Todo[],
    filter: TodoFilter
}

const initialState: TodoState = {
    items: [],
    filter: 'all',
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }

            state.items.unshift(newTodo)
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload
            const item = state.items.find(i => i.id === id)
            if (item) {
                item.completed = !item.completed
            }
            state.items = [...state.items]
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.items = state.items.filter(i => i.id !== id)
        },
        changeFilter: (state, action: PayloadAction<TodoFilter>) => {
            state.filter = action.payload
        }
    }
})

export const { addTodo, changeFilter, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer