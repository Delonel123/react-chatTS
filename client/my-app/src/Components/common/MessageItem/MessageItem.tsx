import { useAppSelector } from '../../../Hooks/ReduxHooks';
import { messages } from '../../../Redux/DialogReducer';
import style from './MessageItem.module.css'
import CheckMark from '../../../img/CheckMark.png'

interface IMessageItem {
    messageitem: messages
}

const MessageItem = ({ messageitem }: IMessageItem) => {
    const meID = useAppSelector((state) => state.profile._id)
    return (
        <div className={meID === messageitem.user ? style.MessageMe : ''}>
            <div className={style.Message}>
                {messageitem.body}
            </div>
            <p className={style.messageTime}>Today 13.00</p>
            {meID === messageitem.user ? messageitem.isRead ?
                <>
                    <img className={style.checkMark + ' ' + style.checkMarkTwo} width={20} src={CheckMark} alt="" />
                    <img className={style.checkMark} width={20} src={CheckMark} alt="" />
                </> :
                <img className={style.checkMark} width={20} src={CheckMark} alt="" />: <div></div>
            }

        </div>
    );
}

export default MessageItem;