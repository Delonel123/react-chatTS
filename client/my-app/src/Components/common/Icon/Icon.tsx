import React from 'react';
import style from './Icon.module.css'
interface IProps{
    image:string,
    width: number,
    className?:string
}
const Icon = ({image,width,className}:IProps): JSX.Element => {
    return (
        <img className={style.profileIcon + ' ' + className} height={width} width={width} src={image} alt="alt" />
    )
}

export default Icon;