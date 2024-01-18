import React, { useEffect, useState } from 'react';
import './profile-friends.scss';
import { ProfilePeople } from '../../components/ProfilePeople';
import { getFriendsByUserId } from '../../services/api/friend-list';
import { getUserBySlug } from '../../services/api/user';
import { useSession } from '../../hooks/useSession';
import { useLocation } from 'react-router-dom';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { useRouteLoaderData } from 'react-router-typesafe';

function ProfileFriends() {
    let user: UserDto = useRouteLoaderData('user') as UserDto;
    const [u, setU] = useState<UserDto>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    if(patharr[1] === 'profile') {
        setU(useRouteLoaderData('profile-user') as UserDto); 
    } else {
        setU(user);
    }
    const [friends, setFriends] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            if(patharr[1] == 'profile') {
                const frnds = await getFriendsByUserId(u?.id);
                setFriends(frnds?.users);
            } else {
                const frnds = await getFriendsByUserId(u?.id);
                setFriends(frnds?.users);
            }
        }
        fetchData();
    }, [])

	return (
        <>
        <div className="col-lg-8 gedf-main profile-friends">
            <div className="card social-timeline-card">
                <div className="card-body">
                    <h5 className="card-title">Friends list (8)</h5>
                    <ul className="friend-list">
                    {friends ? friends.map((friend: any) => {
                            return (
                        <li key={friend.id}>
                            <div className="left"> 
                                <img src={'http://localhost:3000/upload/' + friend?.profile?.profilePhoto} alt="" />
                            </div>
                            <div className="right">
                                <h3>{friend?.profile?.firstName} {friend?.profile?.lastName}</h3>
                            </div>
                        </li>
                            )}) : <p>No friends...</p>}
                    </ul>
                </div>
            </div>
            </div>
            <ProfilePeople />
        </>
	);
}
export default ProfileFriends;