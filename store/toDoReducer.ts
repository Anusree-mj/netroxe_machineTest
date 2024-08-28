import { createSlice } from "@reduxjs/toolkit";

import { ToDoItem } from "./type";

export interface todoStateType {
    todo: ToDoItem;
    isLoading: boolean;
    error: string;
}

const initialState: todoStateType = {
    todo: {
        _id: "",
        task: "",
        description: '',
        isCompleted: false,
        userId: ""
    },
    isLoading: false,
    error: ''
}

export const todoSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // get user details
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

       

    }
})
export const {
    addTodoAction, addTodoSuccessAction, addTodoFailureAction,
} = todoSlice.actions;