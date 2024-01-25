import { Dropdown, MenuProps, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { useFetchNotificationsQuery } from '../../features/api/api-slice';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/api/user';
import { useSession } from '../../hooks/useSession';

const Notifications = () => {
    const { user, isAuthenticated } = useSession();
    const [items, setItems] = useState<any>([]);
    const {
        data: notifications,
        isLoading,
        isSuccess,
        isError,
        error
      } = useFetchNotificationsQuery(user?.id);

      useEffect(() => {
        const fetchData = async () => {
            let i = 0;
            if(notifications) {
                const itms = notifications.map(async (notification) => {
                    const usr = await getUser(notification.initiatorId);
                    i++;
                    return {
                        user: usr,
                        notificationType: notification.notificationType,
                        label: (
                            <Link to={'/profile/' + usr.profile.urlString}>{notification.label + '' + notification.notificationType}</Link>
                        ),
                    };
                })
                setItems(itms);
            }
        }
        fetchData();
    }, [isLoading])

    return (
        <>
            <div className="notification-icon-wrapper">
                <a className="notification-trigger" onClick={(e) => e.preventDefault()}>
                    <Space style={{ padding: 8 }}>
                    <i className="fa fa-bell notification-icon" />
                </Space>
                </a>
            </div>
            <ul className="notification-wrapper">
                {items ? items.map((item: any, index: number) => {
                    return (
                        <li key={index} className="notification-item">
                            <Link to={'/profile/' + item.user.profile.urlString}>{item.label + '' + item.notificationType}</Link>
                        </li>
                    )
                }) : ''}
            </ul>
        </>
    )
}

export default Notifications;