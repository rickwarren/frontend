import React, { useEffect, useState } from 'react';
import './videos.scss';
import { ChatWidget } from '../../components/ChatWidget';
import { Outlet } from 'react-router-dom';
import { VideosMenu } from './video-menu';

const Videos: React.FC = (props: any) => {
    return (
        <>
            <VideosMenu />
            <div className="row">
                <div className="col-lg-7 gedf-main videos-wrapper">
                    <Outlet />       
                </div>
            </div>
            <ChatWidget />
        </>
    );
}

export default Videos;