import { createSlice } from "@reduxjs/toolkit";

import { UserItem } from "./type";

export interface userStateType {
    user: UserItem;
    isLoading: boolean;
    error: string;
}

const initialState: userStateType = {
    user: {
        _id: "",
        name: "",
        email: '',
        password: ""
    },
    isLoading: false,
    error: ''
}

export const userAuthSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // get user details
        userSignupAction: (state) => {
            state.isLoading = true;
        },
        userSignupSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            console.log('user in reducer', state.user)
        },
        userSignupFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        userLoginAction: (state) => {
            state.isLoading = true;
        },
        userLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            console.log('user in reducer', state.user)
        },
        userLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
})
export const {
    userSignupAction, userSignupSuccessAction, userSignupFailureAction,
    userLoginAction, userLoginFailureAction, userLoginSuccessAction
} = userAuthSlice.actions;