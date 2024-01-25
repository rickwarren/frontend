import React, { useEffect, useState } from 'react';
import './search-results.scss';
import { ChatWidget } from '../../components/ChatWidget';
import SearchMenu from './search-menu';
import { Outlet } from 'react-router-dom';

   

const SearchResults: React.FC = (props: any) => {
    return (
        <>
            <SearchMenu />
            <div className="row">
                <div className="col-lg-7 gedf-main feed-wrapper">
                    <Outlet />       
                </div>
            </div>
            <ChatWidget />
        </>
    );
}

export default SearchResults;