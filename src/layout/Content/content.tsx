import React from 'react';
import "./content.styles.scss";
import { Router } from '../../router';
import { ChatWidget } from '../../components/ChatWidget';
import { Outlet } from 'react-router-dom';

const Content: React.FC = (props: any) => {
    return (
        <>
            <div className="content-wrapper">
                <Outlet />
            </div>
        </>
    );
}

export default Content;