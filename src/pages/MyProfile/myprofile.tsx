import React, { useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './myprofile.styles.scss';
import { useSession } from '@/hooks';
import { ProfileDto } from '@/services/api/profile/dto/profile.dto';
import { getProfile } from '@/services/api/profile';

const MyProfile: React.FC = (props: any) => {
    const profilePhotoUrl = '';
    const { user } = useSession();
    const [profile, setProfile] = useState<ProfileDto>()
    if(user !== undefined) {
        getProfile(user.id).then((p: any) => {
            setProfile(p);
        });
    }

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

export default MyProfile;