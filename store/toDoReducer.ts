import { createSlice } from "@reduxjs/toolkit";

import { ToDoItem } from "./type";

export interface todoStateType {
    todo: ToDoItem[];
    isLoading: boolean;
    error: string;
}

const initialState: todoStateType = {
    todo: [],
    isLoading: false,
    error: ''
}

export const todoSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // get todo details
        addTodoAction: (state) => {
            state.isLoading = true;
        },
        addTodoSuccessAction: (state, action) => {
            state.isLoading = false;
        },
        addTodoFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        getTodoAction: (state) => {
            state.isLoading = true;
        },
        getTodoSuccessAction: (state, action) => {
            state.isLoading = false;
            state.todo = action.payload
            console.log('todos in reducer', state.todo)
        },
        getTodoFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },



    }
})
export const {
    addTodoAction, addTodoSuccessAction, addTodoFailureAction,
    getTodoAction, getTodoFailureAction, getTodoSuccessAction
} = todoSlice.actions;