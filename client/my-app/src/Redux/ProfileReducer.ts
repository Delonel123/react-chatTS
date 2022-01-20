import { createSlice,PayloadAction} from "@reduxjs/toolkit";


interface Profile {
    _id:Number,
    login: string,
    email:string,
    online: Boolean

}
const initialState: Profile = {
    _id:1,
    login: '',
    email:'',
    online: false,

}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setProfile(state,action:PayloadAction<Profile>){
            state._id = action.payload._id
            state.login = action.payload.login
            state.email = action.payload.email
            state.online = action.payload.online
        }
    }
})

export const {setProfile} = UserSlice.actions
export default UserSlice.reducer