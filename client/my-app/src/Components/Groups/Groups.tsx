import style from './Groups.module.css'
import settingIcon from '../../img/setting.svg'
import groupIconOne from '../../img/groupIcon1.png'
import groupIconTwo from '../../img/groupIcon2.png'
import groupIconThree from '../../img/groupIcon3.png'


export interface obj {
    icon: string,
    name: string,
    message: string
}

export type fetchData = obj[]

const Groups = () => {
    const tmpObject: fetchData = [
        {
            icon: groupIconOne,
            name: 'Friends Reunion',
            message: 'Hi Guys, Wassup!'
        },
        {
            icon: groupIconTwo,
            name: 'Friends Forever',
            message: 'Good to see you.'
        },
        {
            icon: groupIconThree,
            name: 'Crazy Cousins',
            message: 'What plans today?'
        }
    ]
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <p className={style.titleText}>Group</p>
                <button>
                    <img src={settingIcon}></img>
                </button>
            </div>
            {tmpObject.map((item, index) => {
                return (
                    <div key={index} className={style.groupItem}>
                        <img className={style.groupIcon} src={item.icon} />
                        <div>
                            <p className={style.groupName}>{item.name}</p>
                            <p className={style.groupMessage}>{item.message}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Groups;