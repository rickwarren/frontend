import { api } from '@/services';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

async function getFriendRequests() {
    const response = await api.get('http://localhost:3000/friend-request');
    return response.data;
}

async function getFriendRequestsByUserId(userId: string) {
    const response = await api.get('http://localhost:3000/friend-request/{userId}');
    return response.data;
}

async function getFriendRequest(requesterId: string, addresseId: string) {
    const response = await api.get('http://localhost:3000/friend-request/relation?requesterId={requesterId}&addresseId={addresseId}');
    return response.data;
}

async function createFriendRequest(data: CreateFriendRequestDto) {
    const response = await api.post('http://localhost:3000/friend-request/', data);
    return response.data;
}

async function updateFriendRequest(data: UpdateFriendRequestDto) {
    const response = await api.put('http://localhost:3000/friend-request/', data);
    return response.data;
}

async function deleteFriendRequest(id: string) {
    const response = await api.delete('http://localhost:3000/friend-request/{id}');
    return response.data;
}

async function accceptFriendRequest(id: string) {
    const response = await api.get('http://localhost:3000/friend-request/{userId}/accept');
    return response.data;
}

async function declineFriendRequest(id: string) {
    const response = await api.get('http://localhost:3000/friend-request/{userId}/decline');
    return response.data;
}

export {
    getFriendRequests,
    getFriendRequestsByUserId,
    getFriendRequest,
    createFriendRequest,
    updateFriendRequest,
    deleteFriendRequest,
    accceptFriendRequest,
    declineFriendRequest
}
