import style from './Messages.module.css'
import iconMessage from '../../img/messageIcon.png'
import { obj } from '../Users/Users'
interface messageObj extends obj{
    time:string
}
type typeMessage = messageObj[]
const Messages = () => {
    const tempObject: typeMessage = [
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
        {
            icon: iconMessage,
            name: 'Raghav',
            message: 'Dinner',
            time: 'Today, 8:56pm'
        },
    ]
    return (
        <div className={style.wrapper}>
            <p className={style.title}>Messages</p>
            {tempObject.map((item, index) => {
                return (
                    <div key={index} className={style.messageItem}>
                        <div className={style.leftPath}>
                            <img className={style.icon} src={item.icon} alt="icon" />
                            <div className={style.textx}>
                                <p className={style.messageName}>{item.name}</p>
                                <p className={style.messageText}>{item.message}</p>
                            </div>
                        </div>
                        <p className={style.messageTime}>{item.time}</p>
                    </div>
                )
            })}

        </div>
    );
}

export default Messages;