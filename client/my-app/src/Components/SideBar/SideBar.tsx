import Icon from '../common/Icon/Icon';
import Navigation from '../Navigation/Navigation';
import style from './SideBar.module.css'
import linkIconOne from '../../img/LinkHome.png'
import { Link, useNavigate } from 'react-router-dom';
import exit from '../../img/exit.svg'
import $api from '../../API';

interface objLink {
    path: string,
    icon: string
}
export type links = objLink[]

const SideBar = () => {
    const navigate = useNavigate()
    const links: links = [
        {
            path: '/chat',
            icon: linkIconOne
        }
    ]
    const logout = () => {
        $api.get('/logOut').then(() => {
            localStorage.clear()
            navigate('/', { replace: true })
        })

    }
    return (
        <div className={style.sideBarWrapper}>
            <div className={`${style.df} ${style.fldircol}`}>
                <Icon className={style.icon} image='https://stihi.ru/pics/2014/11/10/9896.jpg' width={100} />
                <Navigation links={links} />
            </div>
            <button onClick={logout}>
                <img src={exit}></img>
            </button>
        </div>
    );
}

export default SideBar;