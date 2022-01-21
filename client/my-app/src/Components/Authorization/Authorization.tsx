import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input';
import style from './Authorization.module.css'
import { useAppDispatch } from '../../Hooks/ReduxHooks';
import { fetchProfile } from '../../Redux/ProfileReducer';


const Authorization: React.FC = (): JSX.Element => {
    // FIXME: добавить поле isAuthorise в redux и проверять вошел ли пользователь
    const [valueLogin, setValueLoginInput] = useState<string>('')
    const [valuePassword, setPasswordInput] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const authorisation = async () => {
        dispatch(fetchProfile({ valueLogin, valuePassword }))
        navigate('/chat')
    }
    return (
        <div className={style.Authorization}>
            <div className={style.AuthorizationWindow}>
                <h1 className={style.title}>ZXC</h1>
                <div className={style.AuthorizationItem}>
                    <p className={style.text}>Логин</p>
                    <Input valueInput={valueLogin} setValueInput={setValueLoginInput} width={607} placeholderText='Введите логин...' typeInput='text' />
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