import style from './Dialog.module.css'
import Icon from '../../img/dialogIcon.png'
import Phone from '../../img/Phone.svg'
import Video from '../../img/video.svg'
import Setting from '../../img/setting.svg'
import Message from '../Message/Message'
import SendMessage from '../SendMessage/SendMessage'


const Dialog = () => {
    
    return (
        <div className={style.wrapper}>
            <div className={style.dialogTop}>
                <div className={style.dialogLeft}>
                    <img className={style.dialogIcon} src={Icon} alt='icon' />
                    <div className={style.texts}>
                        <p className={style.dialogName}>Swathi </p>
                        <p className={style.dialogStatus}>Online</p>
                    </div>
                </div>
                <div className={style.dialogRight}>
                    <button className={style.button}>
                        <img src={Phone} />
                    </button>
                    <button className={style.button}>
                        <img src={Video} />
                    </button>
                    <button className={style.button}>
                        <img src={Setting} />
                    </button>
                </div>
            </div>
            <Message/>
            <SendMessage />
        </div>
    );
}

export default Dialog;