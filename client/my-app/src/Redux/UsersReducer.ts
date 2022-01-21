import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../API";
import { Profile } from "./ProfileReducer";


interface Users {
    users: Profile[]
}

const initialState: Users = {
    users: []
}

const UsersSlice = createSlice ({
    name:'users',
    initialState,
    reducers:{
        setUsers(state:Users, action:PayloadAction<Users>){
            state.users = action.payload.users
        }
    }
})

// thunk
export const fetchUsers = createAsyncThunk(
    '/users',
    async(_,thunkAPI) =>{
        $api.get('/getUsers').then((res:AxiosResponse<Users>) =>{
            thunkAPI.dispatch(setUsers(res.data))
        })
    }
)

export const {setUsers} = UsersSlice.actions
export default UsersSlice.reducer