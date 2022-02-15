import React, { useEffect } from 'react';
import Dialog from '../Dialog/Dialog';
import Groups from '../Users/Users';
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import style from './MainPage.module.css'
import { fetchUsers } from '../../Redux/UsersReducer';
import { useAppDispatch } from '../../Hooks/ReduxHooks';
import { checkAuth } from '../../Redux/ProfileReducer';

const MainPage: React.FC = (props): JSX.Element => {
    const dispatch = useAppDispatch()
    useEffect(() =>{
        dispatch(fetchUsers())
    },[])

    useEffect(() =>{
        if(localStorage.getItem('accessToken')){
            dispatch(checkAuth())
        }
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