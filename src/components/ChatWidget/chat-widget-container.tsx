import React, { useEffect, useState } from "react"
import { ChatWidgetUserList } from "./chat-widget-user-list"
import { ChatWidgetWindow } from "./chat-widget-window"
import { Badge, Col, Row } from "antd"
import { useSession } from "../../hooks/useSession"
import { getFriendsByUserId } from "../../services/api/friend-list"

export const ChatWidgetContainer = (props: any) => {
    const [visible, setVisible] = React.useState(false)
    const [chatWindow, setChatWindow] = React.useState<any>([]);

    const toggleVisible = () => {
        setVisible(!visible);
    }

    const toggleChatWindow = (usr: any) => {
        const result = chatWindow.map((chat: any) => {
            return chat.user.id === usr.id
        });
        if(!result.includes(true)) { 
            setChatWindow([...chatWindow, {user: usr, elem: chatWindow.concat(<ChatWidgetWindow user={usr} />)}]);
        }
    }

    const hide = (index: any) => {
        const newChatWindow = chatWindow.filter((chat: any, i: any) => {
            return i !== index
        })
        setChatWindow(newChatWindow);
    }

    return (
        <>
            <div className="chat-widget-wrapper">
                <Row justify="space-between" align="bottom">
                    {chatWindow.map((item: any, index: any) => {
                        let connectedUsers: any | null = localStorage.getItem('connectedUsers');
                        connectedUsers = JSON.parse(connectedUsers);
                        let status = 'default';
                        if(connectedUsers) {
                            status = connectedUsers[item?.user?.id] ? 'success' : 'offline';
                        }
                        return (
                            <Col key={index}>
                                <ChatWidgetWindow user={item.user} />
                                <div className="chat-window-header">
                                    <div className="chat-window-header-wrapper">
                                        <span className="chat-window-title">
                                            <span className="window-name">{item?.user?.profile?.firstName} {item?.user?.profile?.lastName}</span>
                                        </span>
                                        <div className="close-button">
                                            <i className="fas fa-xmark" onClick={() => hide(index)}></i>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                    <Col>
                        <div className="chat-widget-container">
                            <ChatWidgetUserList click={toggleChatWindow} />
                            <div className="user-list-header">
                                <span className="user-list-title">Chat</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}