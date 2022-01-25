import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../Hooks/ReduxHooks';
import MessageItem from '../common/MessageItem/MessageItem';
import style from './Message.module.css'


export interface MessageObj{
}
export type MessageType = MessageObj[]
const Message = () => {
    const state = useAppSelector((state) => state.messages)
    const findMessage = state.find((item) => item.isSelected)
    const messagesEnd = useRef<any>(null)
    const messages = findMessage?.messages
    useEffect(() =>{
            messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    },[messages])
    return (
        <div className={style.messageWrapper}>
            {messages &&  messages.map((item,index) =>{
                return(
                    <MessageItem messageitem={item}  />
                )
            })}
            <div ref={messagesEnd} />
        </div>
    );
}

export default Message;