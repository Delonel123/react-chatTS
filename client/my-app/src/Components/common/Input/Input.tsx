import React, { CSSProperties, useState } from 'react';
interface IProps{
    placeholderText:string,
    typeInput: 'text' | 'password',
    width: number,
    valueInput:string,
    setValueInput: (value:string) => void,
    className?: string
}


export const Input = ({placeholderText,typeInput,width,valueInput,setValueInput,className}:IProps): JSX.Element => {
    const styles:CSSProperties = {
        width: width,
        height: 45,
        backgroundColor: '#E0E0E0',
        borderRadius: '10px',
        padding: '8px 10px'
    }
    return (
            <input style={styles} className={className && className} type={typeInput} placeholder={placeholderText} value={valueInput} onChange={(e) => setValueInput(e.currentTarget.value)}/>
    );
}

export default Input;