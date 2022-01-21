import { useAppSelector } from '../../../Hooks/ReduxHooks';
import { messages } from '../../../Redux/DialogReducer';
import style from './MessageItem.module.css'

interface IMessageItem{
    messageitem:messages
}

const MessageItem = ({messageitem}:IMessageItem) => {
    const meID = useAppSelector((state) => state.profile._id)
    return (
        <div className={meID === messageitem.user ? style.MessageMe : ''}>
            <div className={style.Message}>
                {messageitem.body}
            </div>
            <p className={style.messageTime}>Today 13.00</p>
        </div>
    );
}

export default MessageItem;