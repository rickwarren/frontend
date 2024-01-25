import React from 'react'
import { Link, useLocation } from 'react-router-dom/dist';

export const FriendMenu = () => {
    const location = useLocation();
    const path = location.search;
    const p = location.pathname;
    const parr = p.split('/');

    return (
        <>
            <div className="feed-menu-button-wrapper">
                <i className="fa fa-bars feed-menu-button" />
            </div>
            <div className="feed-menu-wrapper">
                <ul className="feed-menu-list">
                    <li className="feed-menu-item">
                        <Link to={'/' + path}>
                            <i className="fa fa-house" />
                            <h5>Home</h5>
                        </Link>
                    </li>
                    <li className={parr[1] === 'friends' && parr[2] === undefined ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/friends' + path}>
                            <i className="fa fa-user" />
                            <h5>Friends</h5>
                        </Link>
                    </li>
                    <li className={parr[2] === 'friends' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/friends/friends' + path}>
                            <i className="fa fa-users" />
                            <h5>Friends of Friends</h5>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}