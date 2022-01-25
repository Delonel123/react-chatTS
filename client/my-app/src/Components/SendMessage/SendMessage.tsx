import style from './SendMessage.module.css'
import fileButton from '../../img/sendFileButton.svg'
import smileButton from '../../img/smileButton.svg'
import photoButton from '../../img/photoButton.svg'
import VoiceButton from '../../img/micro.svg'
import React, { useRef, useState } from 'react'
import { io } from "socket.io-client";
import { useAppSelector } from '../../Hooks/ReduxHooks'
interface ISendMessage {
    sendMessage: (value: string) => void
}
export interface typeingResData {
    id: string,
    isTyping: boolean,
    dialog?: string
}
const SendMessage = ({ sendMessage }: ISendMessage) => {
    const [valueInput, setInputValue] = useState<string>('')
    const input = useRef<HTMLInputElement>(null)
    const state = useAppSelector((state) => state.messages)
    const findMessage = state.find((item) => item.isSelected)
    const idDialog = findMessage?.idDialog
    const meID = useAppSelector((state) => state.profile._id)
    const socket = io('http://localhost:3001')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendMessage(valueInput)
        setInputValue('')
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        if(!input.current?.value){
            const resData: typeingResData = { id: meID, isTyping: false, dialog:idDialog }
            socket.emit('typing', resData)
        }
        if (valueInput && input.current?.value) {
            const resData: typeingResData = { id: meID, isTyping: true, dialog:idDialog }
            socket.emit('typing', resData)
        }

    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={style.SendMessage}>
            <button className={style.sendFile + ' ' + style.sendButton} >
                <img src={fileButton} />
            </button>
            <button className={style.sendSmile + ' ' + style.sendButton}>
                <img src={smileButton} />
            </button>
            <button className={style.sendPhoto + ' ' + style.sendButton}>
                <img src={photoButton} />
            </button>
            <input ref={input} value={valueInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handelChange(e)} className={style.Input} />
            <button type='submit' className={style.sendVoice}>
                <img src={VoiceButton} />
            </button>
        </form>
    );
}

export default SendMessage;