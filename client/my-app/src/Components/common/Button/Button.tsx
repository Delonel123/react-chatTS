import React from 'react';

interface IProps{
    children:string
    className:string
}

export const Button = ({children,className}: IProps):JSX.Element => {
    return (
        <button className={className}>
            {children}
        </button>
    );
}

export default Button;