import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './profile.styles.scss';

const Profile: React.FC = (props: any) => {
    const profilePhotoUrl = '';
    return (
        <>
            <div className="profile">
                <div className="profile-photo-wrapper">
                    <img src={profilePhotoUrl} className="profle-photo" />
                </div>
                <div className="profile-details">

                </div>
                <nav className="profile-nav">
                    <ul>
                        <li><Link to="activity">Activity</Link></li>
                        <li><Link to="friends">Friends</Link></li>
                        <li><Link to="photos">Photos</Link></li>
                        <li><Link to="videos">Videos</Link></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
}

export default Profile;