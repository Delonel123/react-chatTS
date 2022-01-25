import style from './Dialog.module.css'
import Icon from '../../img/dialogIcon.png'
import Phone from '../../img/Phone.svg'
import Video from '../../img/video.svg'
import Setting from '../../img/setting.svg'
import Message from '../Message/Message'
import SendMessage, { typeingResData } from '../SendMessage/SendMessage'
import { useAppDispatch, useAppSelector } from '../../Hooks/ReduxHooks'
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from 'react'
import { dialog, readMessages, sendMessage } from '../../Redux/DialogReducer'
import { useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Peer from 'peerjs';

interface responceData {
    id: string,
    message: string,
    idDialog: string | undefined
}
interface readResponce {
    id: string,
    idDialog: string | undefined
}

const Dialog = () => {
    // const name = useAppSelector((state) => state.messages.name)
    // const idUser = useAppSelector((state) => state.messages.idCompanion)
    // const idDialog = useAppSelector((state) => state.messages.idDialog)
    // const isSelected = useAppSelector((state) => state.messages.isSelected)
    // const meID = useAppSelector((state) => state.profile._id)
    const meID = useAppSelector((state) => state.profile._id)
    const state = useAppSelector((state) => state.messages)
    const findMessage = state.find((item) => item.isSelected)
    const name = findMessage?.name
    const idUser = findMessage?.idCompanion
    const idDialog = findMessage?.idDialog
    const isSelected = findMessage?.isSelected

    const [isTyping, setIsTyping] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const socket = io('http://localhost:3001')
    useEffect(() => {
        if (isSelected) {
            socket.on('connection', () => { })
            if (meID && idDialog) {
                socket.emit('readMessage', {
                    id: meID,
                    idDialog: idDialog
                })
            }
        }
    }, [isSelected])
    const sendMessages = (value: string): void => {
        const messageData: responceData = {
            id: meID,
            message: value,
            idDialog: idDialog
        }
        const resData: typeingResData = { id: meID, isTyping: false, dialog: idDialog }
        socket.emit('typing', resData)
        socket.emit('message', messageData)
    }
    useEffect(() => {
        socket.on('typing', (data: typeingResData) => {
            if (data.id !== meID && idDialog && idDialog === data.dialog) {
                setIsTyping(data.isTyping)

            }
            if (data.id !== meID && idDialog && idDialog === data.dialog && isSelected) {
                // СООБЩЕНИЕ ПРОЧИТАНО
                console.log('123')
                dispatch(readMessages({ idDialog }))
            }
        })
        socket.on('readMessage', (data: readResponce) => {
            if (data.id !== meID && idDialog && idDialog === data.idDialog && isSelected) {
                // СООБЩЕНИЕ ПРОЧИТАНО
                dispatch(readMessages({ idDialog }))
            }
        })
    }, [meID, idDialog])
    useEffect(() => {
        if (idUser) {
            socket.on('message', (data: responceData) => {
                if (idDialog) {
                    dispatch(sendMessage({
                        isRead: false,
                        body: data.message,
                        dialog: idDialog,
                        user: data.id,
                        usercompanion: idUser
                    }))
                }
            })
        }
    }, [idUser])


    // WEBRTC
    const [modaiIsOpen, setModalIsOpen] = useState<boolean>(false)
    const handleOpenModal = (value: boolean) => {
        setModalIsOpen(value)
    }

    useEffect(() =>{
        const peer = new Peer();
        peer.on('open', (peerID) =>{
            console.log(peerID)
        })
        peer.on('call', (call) =>{
            const peercall = call
            // ТУТ НАМ ЗВОНЯТ И МЫ ДОЛЖНА БЛОК С ПРИНЯТИЕМ ЗВОНКА ВЫВЕСТИ
        })
    },[])
    const callToNode = () => {
        navigator.mediaDevices.getDisplayMedia({audio:true,video:true}).then((mediaStream) =>{
            
        })
    }

    // 
    return (
        <div className={style.wrapper}>
            {modaiIsOpen && <Modal handelChange={handleOpenModal} />}
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
                        <button onClick={callToNode} className={style.button}>
                            <img src={Video} />
                        </button>
                        <button className={style.button}>
                            <img src={Setting} />
                        </button>
                    </div>
                </div>
                    <Message />
                    {isTyping && <div> Пользователь пишет... </div>}
                    <SendMessage sendMessage={sendMessages} />
                </>
            }

        </div>
    );
}

export default Dialog;