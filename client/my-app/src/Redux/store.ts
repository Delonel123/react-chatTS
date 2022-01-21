import { configureStore } from "@reduxjs/toolkit";
import DialogReducer from "./DialogReducer";
import ProfileReducer from "./ProfileReducer";
import UsersReducer from "./UsersReducer";

export const store = configureStore({
    reducer:{
        profile: ProfileReducer,
        users:UsersReducer,
        messages:DialogReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootStae = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch