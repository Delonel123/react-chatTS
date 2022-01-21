import React, { useEffect } from 'react';
import Dialog from '../Dialog/Dialog';
import Groups from '../Users/Users';
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import style from './MainPage.module.css'
import { fetchUsers } from '../../Redux/UsersReducer';
import { useAppDispatch } from '../../Hooks/ReduxHooks';

const MainPage: React.FC = (props): JSX.Element => {
    const dispatch = useAppDispatch()
    useEffect(() =>{
        dispatch(fetchUsers())
    },[])
    return (
        <div className={style.wrapper}>
            <SideBar />
            <div className={style.leftPath}>
                <Groups />
                <Messages />
            </div>
            <Dialog />
        </div>
    );
}
export default MainPage;