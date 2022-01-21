import { useAppSelector } from '../../Hooks/ReduxHooks';
import MessageItem from '../common/MessageItem/MessageItem';
import style from './Message.module.css'


export interface MessageObj{
}
export type MessageType = MessageObj[]
const Message = () => {
    const messages = useAppSelector((state) => state.messages.messages)
    const tmpMessage: MessageType = [
        {
            id: 2,
            message:'Hey There !',
            time:'Today, 2:01pm'
        },
        {
            id: 2,
            message:'How are you doing?',
            time:'Today, 2:02pm'
        },
        {
            id: 1,
            message:'Hello...',
            time:'Today, 2:12pm'
        },
        {
            id: 1,
            message:'I am good  and hoew about you?',
            time:'Today, 2:12pm'
        },
        {
            id: 2,
            message:'I am doing well. Can we meet up tomorrow?',
            time:'Today, 2:13pm'
        },
        {
            id: 1,
            message:'Sure!',
            time:'Today, 2:14pm'
        },
        {
            id: 2,
            message:'I am doing well. Can we meet up tomorrow?',
            time:'Today, 2:13pm'
        },
    ]
    return (
        <div className={style.messageWrapper}>
            {messages.map((item,index) =>{
                return(
                    <MessageItem messageitem={item}  />
                )
            })}
        </div>
    );
}

export default Message;