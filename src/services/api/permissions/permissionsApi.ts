import { api } from '@/services';
import { CreatePermissionDto } from './dto/create-permission.dto';

async function getPermissions(userId: string) {
    const response = await api.get('http://localhost:3000/permissions/{userId}');
    return response.data;
}

async function createPermission(data: CreatePermissionDto) {
    const response = await api.post('http://localhost:3000/permissions/', data);
    return response.data;
}

async function deletePermissions(userId: string) {
    const response = await api.delete('http://localhost:3000/permissions/{userId}');
    return response.data;
}

export {
    getPermissions,
    createPermission,
    deletePermissions
}
