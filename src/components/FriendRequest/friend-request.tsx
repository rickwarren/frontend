import React, { useEffect, useState } from 'react';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { useRouteLoaderData } from 'react-router-typesafe';
import { useLocation } from 'react-router-dom';
import { createFriendRequest, getFriendRequestsByUserId } from '../../services/api/friend-request';
import { getFriendsByUserId } from '../../services/api/friend-list';

const FriendRequest = () => {
    const user: UserDto = useRouteLoaderData('user') as UserDto;
    const [u, setU] = useState<UserDto>();
    const [friend, setFriend] = useState<any>();
    const [friendRequested, setFriendRequested] = useState<boolean>(false);
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    if(typeof user?.id == string && patharr[1] === 'profile') {
        setU(useRouteLoaderData('profile-user') as UserDto);
    } else {
        setU(user);
    }

    const messageFriend = async () => {
        console.log('open message window');
    }

    const requestFriend = async () => {
        if(user) {
            await createFriendRequest({
                requesterId: user?.id,
                addresseId: u?.id ? u.id : '',
                status: 'pending'
            });
            setFriendRequested(true);
        }
    }

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await getFriendsByUserId(user?.id);
            if(response?.users.includes(u)) {
                setFriend(true);
            } else {
                setFriend(false);
            }
        }
        const fetchFriendRequest = async () => {
            if(user) {
                const response = await getFriendRequestsByUserId(user?.id);
                response.forEach((request: any) => {
                    if(request.addresseId === u?.id || request.requesterId === u?.id) {
                        setFriendRequested(true);
                    }
                })
            }
        }
        fetchFriends();
        fetchFriendRequest();
    }, [u]);

    return (
        <div className="friend-wrapper">
            {friend ? (
                <button className="btn btn-primary" onClick={messageFriend}>Send a message</button>
            ) : friendRequested ? (
                <button className="btn btn-primary" disabled>Friend request sent</button>
            ) : (
                <button className="btn btn-primary" onClick={requestFriend}>Send Friend Request</button>
            )}
        </div>
    )
}

export default FriendRequest;