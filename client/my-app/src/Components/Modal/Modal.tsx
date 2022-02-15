import React, { useEffect, useRef, useState } from 'react';
import style from './Modal.module.css'
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useAppSelector } from '../../Hooks/ReduxHooks';
interface IModal {
    handelChange: (value: boolean) => void,
    idDIalog: string | undefined,
    meID: string,
    idUser: string | undefined,
    caller: boolean,
    typeSession: 'video' | 'audio' | ''
}
const Modal = ({ handelChange, idDIalog, meID, idUser, caller,typeSession }: IModal) => {
    const socket = io('http://localhost:3001')
    const myVideo: any = useRef(null)
    const videoPartner: any = useRef(null)
    const [chet, setChet] = useState(0);
    const [stream,setStream] = useState<MediaStream>()
    const myName = useAppSelector((state) => state.profile.login)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream)
            if (myVideo.current) {
                myVideo.current.srcObject = stream
                myVideo.current.onloadedmetadata = function (e: any) {
                    myVideo.current.play();
                };
            }
            if (!caller) {
                    socket.emit('Calling', { idUser, idDIalog, name:myName })
                    socket.on('AcceptCalling', (data: any) => {
                        if (data === idDIalog) {
                            const peerInitiator = new Peer({ initiator: true, trickle: false, stream })
                            const peerAcceptor = new Peer({ trickle: false })

                            peerInitiator.on('signal', data => {
                                console.log(data)
                                socket.emit("sendVideo", { idUser, idDIalog, signal: data })
                            })
                            socket.on('backVideo', data => {
                                peerAcceptor.signal(data.signal)
                                peerAcceptor.on('signal', data => {
                                    console.log(data)
                                    socket.emit('answerCall', { idUser, idDIalog, signal: data })
                                })
                                peerAcceptor.on('stream', stream => {
                                    if (videoPartner.current) {
                                        videoPartner.current.srcObject = stream
                                        videoPartner.current.play()
                                    }
                                })
                            })
                            socket.on('answerCaller', data => {
                                peerInitiator.signal(data.signal)
                            })
                        }
                    })

            }
            if (caller) {
                const peerInitiator = new Peer({ initiator: true, trickle: false, stream })
                const peerAcceptor = new Peer({ trickle: false })
                    socket.on('sendVideo', data => {
                        // Сделать проверку диалога и пользователя
                        peerInitiator.on('signal', data => {
                            socket.emit("backVideo", { idUser, idDIalog, signal: data })
                        })
                        peerAcceptor.signal(data.signal)
                        peerAcceptor.on('signal', data => {
                            socket.emit('answerCaller', { idUser, idDIalog, signal: data })
                        })
                        peerAcceptor.on('stream', stream => {
                            if (videoPartner.current) {
                                videoPartner.current.srcObject = stream
                                videoPartner.current.play()
                            }
                        })
                    })
                    socket.on('answerCall', data => {
                        peerInitiator.signal(data.signal)
                    })
            }
        })
    }, [])
    const handleCloseVideoSession = () =>{
        if(stream){
            handelChange(false)
            stream.getTracks().forEach(track => track.stop())
            socket.emit('closeVideoSession',{ idUser, idDIalog })
        }
       
    }
    socket.on('closeVideoSession',data =>{
        if(stream){
            handelChange(false)
            stream.getTracks().forEach(track => track.stop())
        }
    })
    return (
        <div className={style.modalInner}>
            <div className={style.modalWindow}>
                <video ref={myVideo} width={350} height={233} poster='https://stihi.ru/pics/2014/11/10/9896.jpg' />
                <video autoPlay ref={videoPartner} width={350} height={233} poster='https://stihi.ru/pics/2014/11/10/9896.jpg' />
                <button onClick={handleCloseVideoSession} className={style.modalButton}> Завершить звонок</button>
            </div>
        </div>

    );
}

export default Modal;