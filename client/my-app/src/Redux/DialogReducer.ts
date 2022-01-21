import { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../API";

export interface messages {
    body: string,
    user: string,
    dialog: string
}
interface paramFetch {
    meID: string,
    companionID:string,
    nameCompanion:string
}
interface Dialog {
    isSelected:boolean
    idCompanion: string,
    idDialog:string,
    name: string,
    messages: messages[]
    isload: boolean
}
interface responceData {
    messages: messages[]
}
const initialState: Dialog = {
    isSelected:false,
    idCompanion: '',
    idDialog:'',
    name:'',
    messages: [
        {
            body: '',
            user: '',
            dialog: "",
        },
    ],
    isload: false
}
interface newMessage{
    newMessage:messages,
    dialog:string
}
const DialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setMessages(state: Dialog, action: PayloadAction<Dialog>) {
            state.isSelected = action.payload.isSelected
            state.idCompanion = action.payload.idCompanion
            state.idDialog = action.payload.idDialog
            state.name = action.payload.name    
            state.isload = action.payload.isload
            state.messages = action.payload.messages
        },
        sendNewMessage(state:Dialog,action:PayloadAction<newMessage>){
            state.messages.push(action.payload.newMessage)
        }
    }
})

// thunk
export const fetchMessages = createAsyncThunk(
    '/messages',
    async ({ meID, companionID,nameCompanion }: paramFetch, thunkAPI) => {
        $api.post('/getMessages', {
            user: meID,
            usercompanion: companionID
        }).then((res: AxiosResponse<responceData>) => {
            console.log(res.data)
            thunkAPI.dispatch(setMessages({
                isSelected:true,
                idCompanion: companionID,
                idDialog:res.data.messages[0].dialog,
                name: nameCompanion,
                messages: res.data.messages,
                isload: true
            }))

        })
    }
)
interface sendMessageData{
    body:string,
    dialog:string,
    user:string,
    usercompanion:string
}
export const sendMessage = createAsyncThunk(
    '/sendMessage',
    async({ body, dialog, user, usercompanion}:sendMessageData,thunkAPI) =>{
        $api.post('/sendMessage',{
            body,
            dialog,
            user,
            usercompanion
        }).then(() =>{
            thunkAPI.dispatch(sendNewMessage({
                newMessage:{
                    body,
                    user:user,
                    dialog:dialog
                },
                dialog:dialog
            }))
        })
    }
)
export const { setMessages,sendNewMessage } = DialogSlice.actions
export default DialogSlice.reducer