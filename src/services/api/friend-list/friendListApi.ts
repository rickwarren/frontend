import { api } from '../../../services';
import { CreateFriendListDto } from './dto/create-friend-list.dto';

async function getFriends() {
    const response = await api.get('http://localhost:3000/friend-list');
    return response.data;
}

async function getFriendsByUserId(userId: string | undefined) {
    if(userId !== undefined) {
        const friends = await api.get('http://localhost:3000/friend-list/' + userId);
        const users = friends.data.map(async (friend: any) => {
            if(friend.requesterId !== userId) {
                return await api.get('http://localhost:3000/user/' + friend.requesterId);
            } if(friend.addresseId !== userId) {
                return await api.get('http://localhost:3000/user/' + friend.addresseId);
            }
        });
        console.log(users);
        return {
            users: users,
            friends: friends.data
        };
    }

}

async function areUsersFriends(requesterId: string, addresseId: string) {
    const response = await api.get('http://localhost:3000/friend-list/{requesterId}/{addresseId}');
    return response.data;
}

async function addFriend(data: CreateFriendListDto) {
    const response = await api.post('http://localhost:3000/friend-request/', data);
    return response.data;
}

async function removeFriend(id: string) {
    const response = await api.delete('http://localhost:3000/friend-request/{id}');
    return response.data;
}

export {
    getFriends,
    getFriendsByUserId,
    areUsersFriends,
    addFriend,
    removeFriend
}
