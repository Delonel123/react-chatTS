import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { links } from '../SideBar/SideBar';
import style from './Navigation.module.css'

interface IProps {
    links: links
}

interface ILink {
    className: string
}
const Navigation = ({ links }: IProps) => {
    const [clickedLink, setClickedLink] = useState<number | null>(0)

    const handleClickOnLink = (id: number) => {
        setClickedLink(id)
    }
    return (
        <div className={style.navigationWrapper}>
            {links.map((item, index) => {
                // className={style.Active} onClick={() => handleClickOnLink(index)} key={`${item}+${index}`}
                return (
                    <Link key={index} onClick={() => handleClickOnLink(index)} className={index === clickedLink ? style.link + ' ' + style.activeLink : style.link} to={item.path}>
                        {/* <LinkItem onClick={() => handleClickOnLink(index)} className={index === clickedLink ? style.IconLink + ' ' + style.Active : style.IconLink} /> */}
                            <img src={item.icon} alt='iconLink' />

                    </Link>
                )
            })}
            {/* style.IconLink */}
        </div>
    );
}

export default Navigation;