import { api } from '../../../services';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

async function getProfiles() {
    const response = await api.get('http://localhost:3000/profile/all');
    return response.data;
}

async function getProfile(userId: string) {
    const response = await api.get("http://localhost:3000/profile/" + userId);
    return response.data;
}

async function createProfile(data: CreateProfileDto) {
    const response = await api.post('http://localhost:3000/profile/', data);
    return response.data;
}

async function updateProfile(data: UpdateProfileDto) {
    console.log(data);
    const response = await api.put('http://localhost:3000/profile/', data);
    return response.data;
}

async function deleteProfile(profileId: string) {
    const response = await api.delete("http://localhost:3000/profile/" + profileId);
    return response.data;
}

export {
    getProfiles,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
}
