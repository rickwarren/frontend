import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header: React.FC = (props: any) => {
    return (
        <>
            <nav className="header-link-wrapper">
                <ul>
                    <li><Link to="/">Feed</Link></li>
                    <li><Link to="profile">My Profile</Link></li>
                </ul>                
            </nav>
        </>
    );
}

export default Header;