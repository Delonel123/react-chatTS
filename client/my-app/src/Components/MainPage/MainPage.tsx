import axios from 'axios';
import React, { useEffect } from 'react';
import $api from '../../API';
import Dialog from '../Dialog/Dialog';
import Groups from '../Groups/Groups';
import Messages from '../Messages/Messages';
import SideBar from '../SideBar/SideBar';
import style from './MainPage.module.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = (props): JSX.Element => {
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