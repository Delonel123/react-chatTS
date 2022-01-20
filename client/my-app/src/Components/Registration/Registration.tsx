import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../API';
import Input from '../common/Input/Input';
import style from './Registration.module.css'

interface requestData {
    login: string,
    password: string,
    email:string
}

const Registration = () => {
    const [valueLogin, setValueLogin] = useState<string>('')
    const [valuePassword, setValuePassword] = useState<string>('')
    const [valueEmail, setValueEmail] = useState<string>('')
    const [valueExamPass, setValueExamPass] = useState<string>('')
    const navigate = useNavigate()
    const registration = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        if (valuePassword === valuePassword && valueLogin && valueEmail) {
            axios.post<requestData>('http://localhost:3001/api/registration', {
                login: valueLogin,
                password: valuePassword,
                email:valueEmail
            }, {
                withCredentials: true,
            }).then((res) => {
                if (res.status === 200) {
                    navigate('/chat', { replace: true })
                }
            })
        }
    }

    return (
        <div className={style.registrationWrapper}>
            <div className={style.registrationInner}>
                <form className={style.formWrapper}>
                    <Input valueInput={valueLogin} setValueInput={setValueLogin} width={607} placeholderText='Введите логин...' typeInput='text' className={style.registrationInput} />
                    <Input valueInput={valuePassword} setValueInput={setValuePassword} width={607} placeholderText='Введите пароль...' typeInput='text' className={style.registrationInput} />
                    <Input valueInput={valueEmail} setValueInput={setValueEmail} width={607} placeholderText='Введите email...' typeInput='text' className={style.registrationInput} />
                    <Input valueInput={valueExamPass} setValueInput={setValueExamPass} width={607} placeholderText='Подтсвердите пароль...' typeInput='text' className={style.registrationInput} />
                    <button onClick={(e) => registration(e)} type='submit' className={style.registrationButton}>Подтвердить</button>
                </form>
            </div>

        </div>
    );
}
export default Registration;