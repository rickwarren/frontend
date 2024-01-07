import React from 'react';
import "./content.styles.scss";
import { Router } from '../../router';

const Content: React.FC = (props: any) => {
    return (
        <>
            <div className="content-wrapper">
                <Router />
            </div>
        </>
    );
}

export default Content;