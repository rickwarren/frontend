import { api } from '@/services';
import { UpdateUserDto } from './dto/update-user.dto';

async function getUsers() {
    const response = await api.get('http://localhost:3000/user/all');
    return response.data;
}

async function getUser(userId: string) {
    const response = await api.get('http://localhost:3000/user/' + userId);
    return response.data;
}

async function updateUser(data: UpdateUserDto) {
    const response = await api.put('http://localhost:3000/user/', data);
    return response.data;
}

async function deleteUser(userId: string) {
    const response = await api.delete('http://localhost:3000/user/' + userId);
    return response.data;
}


export {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}