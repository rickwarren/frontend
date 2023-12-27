import { api } from "../../../services/api";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { PhotoDto } from "./dto/photo.dto";

async function getPhotos(userId: string): Promise<PhotoDto[] | undefined> {
    try {
        const photos = await api.get<any, any>('http://localhost:3000/photo/all/' + userId);
        if(photos) {
            return photos.data;
        }
    } catch(e) {    
        console.log(e);
    }
    return;
}

async function getPhoto(id: string) {
    try {
        const photo = await api.get('http://localhost:3000/photo/' + id);
        if(photo) {
            return photo;
        }
    } catch(e) {    
        console.log(e);
    }
}

async function createPhoto(data: CreatePhotoDto) {
    try {
        const photo = await api.post('http://localhost:3000/photo', data);
        if(photo) {
            return photo;
        }
    } catch(e) {    
        console.log(e);
    }
}

async function deletePhoto(id: string) {
    try {
        const result = await api.delete('http://localhost:3000/photo/' + id);
        if(result) {
            return result;
        }
    } catch(e) {    
        console.log(e);
    }
}

export {
    getPhotos,
    getPhoto,
    createPhoto,
    deletePhoto,
}