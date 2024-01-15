import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { useSession } from '../../hooks';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import { useFetchCurrentUserQuery, useFetchNotificationsQuery } from '../../features/api/api-slice';
import Search, { SearchProps } from 'antd/es/input/Search';
import { getUser } from '../../services/api/user';
import Notifications from './notifications';

const Header: React.FC = (props: any) => {
    const { user, isAuthenticated, signOut } = useSession();

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <Link to="/profile/testuser">My Profile</Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '1',
            label: (
                <Link to="/myprofile">Settings</Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (
                <a href="#" onClick={signOut}>
                    Logout
                </a>
            ),
        },
    ];

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
            <nav className="header-link-wrapper">
                <div className="row">
                <Link to="/">
                    <div className="header-logo" />
                </Link>
                <div className="search-wrapper">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-magnifying-glass"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" className=""></path></svg>
                    <input type="text" className="search-input" placeholder="Search" />
                </div>
                <ul>
                    <li>
                        <Notifications />
                    </li>
                    <li>
                        <Dropdown 
                            menu={{ items }} 
                            placement="bottomRight"
                            className={isAuthenticated ? undefined : 'hidden'}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{ padding: 8 }}>
                                    <Avatar
                                        size={{ xs: 24, sm: 32, md: 48, lg: 48, xl: 48, xxl: 48 }}
                                        src={'http://localhost:3000/upload/' + user?.userModel?.profile?.profilePhoto}
                                        shape="circle"
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                </ul>    
                </div>            
            </nav>
        </>
    );
}

export default Header;