import { findDialog } from './../utils/findDialog';
import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import $api from "../API";

export interface messages {
    isRead:boolean
    body: string,
    user: string,
    dialog: string
}
interface paramFetch {
    meID: string,
    companionID: string,
    nameCompanion: string
}
export interface dialog {
    isSelected: boolean
    idCompanion: string,
    idDialog: string | undefined,
    name: string,
    messages: messages[]
    isload: boolean
}
export type Dialogs = dialog[]
interface responceData {
    messages: messages[]
    newDialog?:{
        _id:string
    }
}
const initialState: Dialogs = [
    {
        isSelected: false,
        idCompanion: '',
        idDialog: '',
        name: '',
        messages: [
            {
                isRead:false,
                body: '',
                user: '',
                dialog: "",
            },
        ],
        isload: false
    }
]
interface newMessage {
    newMessage: messages,
    dialog: string
}
interface readMessage{
    idDialog:string | undefined
}
interface sendMessageData {
    isRead:boolean
    body: string,
    dialog: string,
    user: string,
    usercompanion: string
}
const DialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setMessages(state: Dialogs, action: PayloadAction<dialog>) {
            state.map((item) =>{
                item.isSelected = false
                if(item.idDialog === action.payload.idDialog){
                    item.isSelected = action.payload.isSelected
                    item.idCompanion = action.payload.idCompanion
                    item.idDialog = action.payload.idDialog
                    item.name = action.payload.name
                    item.isload = action.payload.isload
                    item.messages = action.payload.messages
                }
            })
            if(!findDialog(state,action.payload.idDialog)){
                state.push(action.payload)
            }
        },
        sendNewMessage(state: Dialogs, action: PayloadAction<newMessage>) {
            state.map((item) =>{
                if(item.idDialog === action.payload.dialog){
                    item.messages.push(action.payload.newMessage)
                }
            })
        },
        readMessage(state:Dialogs, action:PayloadAction<readMessage>){
            state.map(item =>{
                if(item.idDialog === action.payload.idDialog){
                    item.messages.map((item) => item.isRead = true)
                }
            })
        }
    }
})

// thunk
export const fetchMessages = createAsyncThunk(
    '/messages',
    async ({ meID, companionID, nameCompanion }: paramFetch, thunkAPI) => {
        $api.post('/getMessages', {
            user: meID,
            usercompanion: companionID
        }).then((res: AxiosResponse<responceData>) => {
            console.log(res.data.newDialog?._id)
            thunkAPI.dispatch(setMessages({
                isSelected: true,
                idCompanion: companionID,
                idDialog: res.data.messages[0]?.dialog ? res.data.messages[0].dialog: res.data.newDialog?._id,
                name: nameCompanion,
                messages: res.data.messages,
                isload: true
            }))

        })
    }
)

export const sendMessage = createAsyncThunk(
    '/sendMessage',
    async ({ body, dialog, user, usercompanion,isRead }: sendMessageData, thunkAPI) => {
        $api.post('/sendMessage', {
            isRead,
            body,
            dialog,
            user,
            usercompanion
        }).then(() => {
            thunkAPI.dispatch(sendNewMessage({
                newMessage: {
                    isRead,
                    body,
                    user: user,
                    dialog: dialog
                },
                dialog: dialog
            }))
        })
    }
)
export const readMessages = createAsyncThunk(
    '/readMessage',
    async({idDialog}:readMessage,thunkAPI) =>{
        $api.post('/readMessage',{
            dialog:idDialog
        }).then((res) =>{
            thunkAPI.dispatch(readMessage({idDialog}))
        })
    }
)
export const { setMessages, sendNewMessage,readMessage } = DialogSlice.actions
export default DialogSlice.reducer