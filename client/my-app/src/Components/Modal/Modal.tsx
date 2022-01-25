import React, { useRef } from 'react';
import style from './Modal.module.css'
interface IModal{
    handelChange: (value:boolean) => void
}
const Modal = ({handelChange}:IModal) => {
    const myVideo = useRef<HTMLVideoElement>(null)
    const partnerVideo = useRef<HTMLVideoElement>(null)
    return (
        <div className={style.modalInner}>
            <div className={style.modalWindow}>
                <video ref={myVideo}  width={350} height={233} poster='https://stihi.ru/pics/2014/11/10/9896.jpg'/>
                <video ref={partnerVideo}  width={350} height={233} poster='https://stihi.ru/pics/2014/11/10/9896.jpg'/>
                <button onClick={() => handelChange(false)} className={style.modalButton}> Завершить звонок</button>
            </div>
        </div>

    );
}

export default Modal;