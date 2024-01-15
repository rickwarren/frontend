import React, { useEffect, useState } from 'react';
import './profile-friends.scss';
import { ProfilePeople } from '../../components/ProfilePeople';
import { getFriendsByUserId } from '../../services/api/friend-list';
import { getUserBySlug } from '../../services/api/user';
import { useSession } from '../../hooks/useSession';
import { useLocation } from 'react-router-dom';

function ProfileFriends() {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    const [friends, setFriends] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            if(patharr[1] == 'profile') {
                const usr = await getUserBySlug(patharr[2])
                setU(usr);
                const frnds = await getFriendsByUserId(usr.id);
                console.log(frnds?.users);
                setFriends(frnds?.users);
            } else {
                setU(user);
                const frnds = await getFriendsByUserId(user?.id);
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