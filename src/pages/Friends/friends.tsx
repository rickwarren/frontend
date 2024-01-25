import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom/dist';
import { ChatWidget } from '../../components/ChatWidget';
import { FriendMenu } from './friend-menu';

const Friends = () => {
    return (
        <>
            <FriendMenu />
            <div className="row">
                <div className="col-lg-7 gedf-main feed-wrapper">
                    <Outlet />       
                </div>
            </div>
            <ChatWidget />
        </>
    );
}

export default Friends;