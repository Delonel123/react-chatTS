import style from './Dialog.module.css'
import Icon from '../../img/dialogIcon.png'
import Phone from '../../img/Phone.svg'
import Video from '../../img/video.svg'
import Setting from '../../img/setting.svg'
import Message from '../Message/Message'
import SendMessage from '../SendMessage/SendMessage'
import { useAppDispatch, useAppSelector } from '../../Hooks/ReduxHooks'
import { io, Socket } from "socket.io-client";
import { useEffect } from 'react'
import { sendMessage } from '../../Redux/DialogReducer'

const Dialog = () => {
    const name = useAppSelector((state) => state.messages.name)
    const idUser = useAppSelector((state) => state.messages.idCompanion)
    const idDialog = useAppSelector((state) => state.messages.idDialog)    
    const isSelected = useAppSelector((state) => state.messages.isSelected)
    const dispatch = useAppDispatch()
    const socket = io('http://localhost:3001')
    useEffect(() =>{
        if(isSelected){
            socket.on('connection',() =>{})
        }
    },[isSelected])
    const sendMessages = (value:string):void =>{
        socket.emit('message',value)
    }
    socket.on('message',(data) =>{
        // ДОДЕЛАТЬ НО В ДАТА СООБЩЕНИЕ НОВОЕ
    })
    return (
        <div className={style.wrapper}>
            {!isSelected ?
                <div className={style.unSelectedDialog}><p>Выеберите диалог</p></div> :
                <> <div className={style.dialogTop}>
                    <div className={style.dialogLeft}>
                        <img className={style.dialogIcon} src={Icon} alt='icon' />
                        <div className={style.texts}>
                            <p className={style.dialogName}>{name} </p>
                            <p className={style.dialogStatus}>Online</p>
                        </div>
                    </div>
                    <div className={style.dialogRight}>
                        <button className={style.button}>
                            <img src={Phone} />
                        </button>
                        <button className={style.button}>
                            <img src={Video} />
                        </button>
                        <button className={style.button}>
                            <img src={Setting} />
                        </button>
                    </div>
                </div>
                    <Message />
                    <SendMessage sendMessage={sendMessages} />
                </>
            }

        </div>
    );
}

export default Dialog;