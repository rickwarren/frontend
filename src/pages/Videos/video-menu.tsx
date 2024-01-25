import React from 'react'
import { Link, useLocation } from 'react-router-dom/dist';

export const VideosMenu = () => {
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
                        <Link to={'/'}>
                            <i className="fa fa-house" />
                            <h5>Home</h5>
                        </Link>
                    </li>
                    <li className={parr[1] === 'videos' && (parr[2] === undefined || parr[2] === 'all') ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/videos/all'}>
                            <i className="fa fa-earth-americas" />
                            <h5>All</h5>
                        </Link>
                    </li>
                    <li className={parr[1] === 'videos' && parr[2] === 'friends' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/videos/friends'}>
                            <i className="fa fa-user" />
                            <h5>Friends</h5>
                        </Link>
                    </li>
                    <li className={parr[2] === 'friends-of-friends' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/videos/friends-of-friends' + path}>
                            <i className="fa fa-users" />
                            <h5>Friends of Friends</h5>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}