import style from './AcceptModal.module.css'
import { io } from "socket.io-client";

interface IAceptModal{
    idDialog:string | undefined,
    setAcceptModalIsOpen:(value:boolean) => void,
    setModalIsOpen:(value:boolean) => void,
    setIsCaller:(value:boolean) => void,
    nameCaller:string | null,
}

const AcceptModal = ({setAcceptModalIsOpen,idDialog,setModalIsOpen,setIsCaller,nameCaller}:IAceptModal) => {
    const socket = io('http://localhost:3001')
    const handleAcceptCalling = () => {
        socket.emit('AcceptCalling',idDialog)
        setModalIsOpen(true)
        setIsCaller(true)
        setAcceptModalIsOpen(false)
    }
    return (
        <div className={style.modalInner}>
            <div className={style.modalWindow}>
                <p>Вам звонит {nameCaller}</p>
                <button onClick={handleAcceptCalling} className={style.modalButton}> Ответить</button>
            </div>
        </div>
    )
}

export default AcceptModal