import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { useSession } from '@/hooks';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';

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

    return (
        <>
            <nav className="header-link-wrapper">
                <ul>
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
            </nav>
        </>
    );
}

export default Header;