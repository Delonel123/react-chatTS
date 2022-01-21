import style from './SendMessage.module.css'
import fileButton from '../../img/sendFileButton.svg'
import smileButton from '../../img/smileButton.svg'
import photoButton from '../../img/photoButton.svg'
import VoiceButton from '../../img/micro.svg'
import React, { useState } from 'react'

interface ISendMessage{
    sendMessage:(value:string) => void
}
const SendMessage = ({sendMessage}: ISendMessage) => {
    const [valueInput,setInputValue] = useState<string>('')
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        sendMessage(valueInput)
        setInputValue('')
        
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
                <img src={photoButton}/>
            </button>
            <input value={valueInput} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)} className={style.Input} />
            <button type='submit' className={style.sendVoice}> 
                <img src={VoiceButton}/>
            </button>
        </form>
    );
}

export default SendMessage;