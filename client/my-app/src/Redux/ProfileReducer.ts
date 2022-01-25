import { createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosResponse } from 'axios';


interface responceData {
    tokens:{
        accessToken:string,
        refreshToken:string
    },
    user: Profile
}
interface data{
    valueLogin:string,
    valuePassword:string
}
export interface Profile {
    _id:string,
    login: string,
    email:string,
    online: Boolean

}
interface checkAuthData{
    findUser:Profile,
    tokents:{
        accessToken:string,
        refreshToken:string
    }
}
const initialState: Profile = {
    _id:'',
    login: '',
    email:'',
    online: false,
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        setProfile(state:Profile,action:PayloadAction<Profile>){
            state._id = action.payload._id
            state.login = action.payload.login
            state.email = action.payload.email
            state.online = action.payload.online
        }
    }
})
// thunk
export const fetchProfile = createAsyncThunk(
    '/login',
    async({valueLogin,valuePassword}:data,thunkAPI) =>{
        axios.post<responceData>('http://localhost:3001/api/logIn',{
            login:valueLogin,
            password:valuePassword
        },{
            withCredentials: true,
        }).then((res) =>{
            localStorage.setItem('accessToken',res.data.tokens.accessToken)
            thunkAPI.dispatch(setProfile(res.data.user))
            return res.data.tokens.accessToken
        })
    }    
)
export const logout = createAsyncThunk(
    'logout',
    async() =>{
        
    }
)

export const checkAuth = createAsyncThunk(
    '/chackauth',
    async(_,thunkAPI) => {
        axios.get('http://localhost:3001/api/refresh',{
            withCredentials:true
        }).then(({data}:AxiosResponse<checkAuthData>) =>{
            thunkAPI.dispatch(setProfile(data.findUser))
        })

    }
)

export const {setProfile} = ProfileSlice.actions
export default ProfileSlice.reducer