import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import userReducer from './ProfileReducer'

export const store = configureStore({
    reducer:{
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootStae = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch