import style from './Users.module.css'
import settingIcon from '../../img/setting.svg'
import { useAppDispatch, useAppSelector } from '../../Hooks/ReduxHooks';
import Icon from '../common/Icon/Icon';
import { fetchMessages } from '../../Redux/DialogReducer';

export interface obj {
    icon: string,
    name: string,
    message: string
}

const Users = () => {
    const { users } = useAppSelector((state) => state.users)
    const meID = useAppSelector((state) => state.profile._id)
    const dispatch = useAppDispatch()
    const getMessages = (companionID:string,nameCompanion:string) =>{
        dispatch(fetchMessages({meID,companionID,nameCompanion}))
    }
    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <p className={style.titleText}>Dialogs</p>
                <button>
                    <img src={settingIcon}></img>
                </button>
            </div>
            {
                users && users.map((item, index) => {
                    return (
                        <div key={index} className={style.groupItem}>
                            <Icon image='https://stihi.ru/pics/2014/11/10/9896.jpg' width={50} />
                            <p className={style.groupName}>{item.login}</p>
                            <button onClick={() => getMessages(item._id,item.login)}>
                                <img src='https://www.clipartmax.com/png/full/195-1953726_connect-to-mailing-list-platforms-send-message-icon-png.png' width={30} />
                            </button>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Users;