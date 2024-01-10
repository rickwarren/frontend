import React, { useEffect, useState } from 'react';
import { useSession } from '../../hooks/useSession';
import { getFriendsByUserId } from '../../services/api/friend-list';
import { getToken } from '../../utils/tokenCookies';
import { Badge } from 'antd';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

interface ChatWidgetProps {
    click:  (userId: string) => void;
}

export const ChatWidgetUserList = (props: ChatWidgetProps) => {
    const { user } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState<any>([]);
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [connectedUsers, setConnectedUsers] = useState();

    let response: any;

    useEffect(() => {
        // connect to WebSocket server
        const token = getToken();
        const newSocket = io("http://localhost:3005", {
            query: {token}
          });
          
        setSocket(newSocket);
    
        // set up event listeners for incoming messages
        newSocket.on("connect", () => console.log("Connected to WebSocket"));
        newSocket.on("disconnect", () =>
          console.log("Disconnected from WebSocket")
        );
        newSocket.on("connected users", (data) => {
            setConnectedUsers(data);
            localStorage.setItem('connectedUsers', JSON.stringify(data));
        });
    
        newSocket.auth = { id: user?.id, token: token };
        //                                                                                  clean up on unmount
        return () => {
          newSocket.disconnect();
        };
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            response = await getFriendsByUserId(user?.id);
            response = await Promise.all(response?.users);
            const list = response.map((usr: any) => {
                return usr
            });
            setUserList(list);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    
    return (
        <>
            <div className="chat-widget-user">
                <ul className="chat-widget-user-list">
                    {isLoading ? '' : (
                        userList?.map((item: any, index: any) => {
                            let status = 'default';
                            if(connectedUsers) {
                                status = connectedUsers[item.id] ? 'online' : 'default';
                            }
                            return (
                                <Item key={index} user={item} status={status} click={props.click} />
                            )
                        })
                    )}
                </ul>
            </div>
        </>
    )
}

interface ChatProps {
    click:  (userId: string) => void;
    user: any;
    status: string;
}

export const Item = (props: ChatProps) => {
    const usr = props.user.data;
    return (
        <>
                <li key={usr.id} className="chat-widget-user-list-item" onClick={() => props.click(usr)}>
                    <div className="chat-widget-user-list-item-avatar">
                        <img src={`http://localhost:3000/upload/${usr?.profile ? usr?.profile?.profilePhoto : ''}`} height="50" alt="Avatar" />
                        <Badge status={props.status === 'success' ? 'success' : 'default'} />
                    </div>
                    <div className="chat-widget-user-list-item-name">
                        <span className="chat-widget-user-list-item-name-text">{usr?.profile ? usr?.profile?.firstName : ''} {usr?.profile ? usr?.profile?.lastName : ''}</span>
                    </div>
                </li>
        </>
    )
}