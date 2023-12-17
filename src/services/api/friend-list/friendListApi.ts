import { api } from '@/services';
import { CreateFriendListDto } from './dto/create-friend-list.dto';

async function getFriends() {
    const response = await api.get('http://localhost:3000/friend-list');
    return response.data;
}

async function getFriendsByUserId(userId: string) {
    const response = await api.get('http://localhost:3000/friend-list/{userId}');
    return response.data;
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
