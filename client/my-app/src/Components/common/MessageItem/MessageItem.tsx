import { MessageObj } from '../../Message/Message';
import style from './MessageItem.module.css'

interface IMessageItem{
    messageitem:MessageObj
}

const MessageItem = ({messageitem}:IMessageItem) => {
    const meID = 2;
    return (
        <div className={meID === messageitem.id ? style.MessageMe : ''}>
            <div className={style.Message}>
                {messageitem.message}
            </div>
            <p className={style.messageTime}>{messageitem.time}</p>
        </div>
    );
}

export default MessageItem;