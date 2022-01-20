import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import style from './Authorization.module.css'
import { useDispatch } from 'react-redux';
import { setProfile } from '../../Redux/ProfileReducer';

interface responceData{
    tokens:{
        accessToken:string,
        refreshToken:string
    },
    user:{
        _id:Number,
        login:string,
        email:string,
        online:boolean
    }
}

const Authorization: React.FC = (): JSX.Element => {
    const [valueLoginInput, setValueLoginInput] = useState<string>('')
    const [valuePassword, setPasswordInput] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('accessToken')
    const authorisation = async () =>{
        axios.post<responceData>('http://localhost:3001/api/logIn',{
            login: valueLoginInput,
            password:valuePassword
        },{
            withCredentials: true,
        }).then((res) =>{
            if(res.status === 200){
                localStorage.setItem('accessToken',res.data.tokens.accessToken)
                dispatch(setProfile(res.data.user))
                navigate('/chat', {replace:true})
            } 
        })
    }
    useEffect(() =>{
        // token && navigate('/chat', {replace:true})
    },[])
    return (
        <div className={style.Authorization}>
            <div className={style.AuthorizationWindow}>
                <h1 className={style.title}>ZXC</h1>
                <div className={style.AuthorizationItem}>
                    <p className={style.text}>Логин</p>
                    <Input valueInput={valueLoginInput} setValueInput={setValueLoginInput} width={607} placeholderText='Введите логин...' typeInput='text' />
                </div>
                <div className={style.AuthorizationItem}>
                    <p className={style.text}>Пароль</p>
                    <Input valueInput={valuePassword} setValueInput={setPasswordInput} width={607} placeholderText='Введите пароль...' typeInput='password' />
                </div>
                <div className={style.Buttons}>
                    <button onClick={authorisation} className={style.Button}> Войти </button>
                    <NavLink className={style.Button} to={'/registration'}> Зарегистрироваться </NavLink>
                </div>
            </div>
        </div>
    );
}
export default Authorization;