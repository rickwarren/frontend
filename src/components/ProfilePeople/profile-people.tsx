import React, { useEffect, useState } from 'react';
import { useSession } from '../../hooks/useSession';
import { useLocation } from 'react-router-dom';
import { getUserBySlug } from '../../services/api/user';
import { getFriendsOfFriendsByUserId } from '../../services/api/friend-list';

const ProfilePeople: React.FC = (props: any) => {
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
                const frnds = await getFriendsOfFriendsByUserId(usr.id);
                setFriends(frnds?.users);
            } else {
                setU(user);
                console.log(user);
                const frnds = await getFriendsOfFriendsByUserId(user?.id);
                console.log(frnds);
                setFriends(frnds?.users);
            }
        }
        fetchData();
    }, [])

    return (
        <>
           <div className="card social-timeline-card">
                <div className="card-body">
                    <h5 className="card-title">People you may know</h5>
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
                            )}) : <p>Check again later...</p>}
                    </ul>
                </div>
           </div>
        </>
    );
}

export default ProfilePeople;