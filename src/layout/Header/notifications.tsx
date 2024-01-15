import { Dropdown, MenuProps, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useFetchNotificationsQuery } from '../../features/api/api-slice';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/api/user';
import { useSession } from '../../hooks/useSession';

const Notifications = () => {
    const { isAuthenticated } = useSession();
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const [items, setItems] = useState<any>([
        {
            key: 0,
            label: (
                <br />
            ),
        }
    ]);
    const {
        data: notifications,
        isLoading,
        isSuccess,
        isError,
        error
      } = useFetchNotificationsQuery(user.id);

      useEffect(() => {
        const fetchData = async () => {
            let i = 0;
            if(notifications) {
                const itms: MenuProps['items'] = await Promise.all(notifications.map(async (notification) => {
                    const usr = await getUser(notification.initiatorId);
                    i++;
                    return {
                        key: i-1,
                        label: (
                            <Link to={'/profile/' + usr.profile.urlString}>{notification.label + '' + notification.notificationType}</Link>
                        ),
                    };
                }))
                setItems(itms);
            }
        }
        fetchData();
    }, [isLoading])

    return (
        <Dropdown 
            menu={items} 
            placement="bottomRight"
            className={isAuthenticated ? undefined : 'hidden'}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space style={{ padding: 8 }}>
                    <i className="fa fa-bell notification-icon" />
                </Space>
            </a>
        </Dropdown>
    )
}

export default Notifications;