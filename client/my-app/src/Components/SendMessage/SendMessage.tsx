import style from './SendMessage.module.css'
import fileButton from '../../img/sendFileButton.svg'
import smileButton from '../../img/smileButton.svg'
import photoButton from '../../img/photoButton.svg'
import VoiceButton from '../../img/micro.svg'
const SendMessage = () => {
    return (
        <form className={style.SendMessage}>
            <button className={style.sendFile + ' ' + style.sendButton} >
                <img src={fileButton} />
            </button>
            <button className={style.sendSmile + ' ' + style.sendButton}>
                <img src={smileButton} />
            </button>
            <button className={style.sendPhoto + ' ' + style.sendButton}>
                <img src={photoButton}/>
            </button>
            <input className={style.Input} />
            <button className={style.sendVoice}> 
                <img src={VoiceButton}/>
            </button>
        </form>
    );
}

export default SendMessage;