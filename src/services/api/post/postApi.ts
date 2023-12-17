import { api } from '@/services';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UploadFile } from 'antd';

async function getPosts(locationId: string) {
    const response = await api.get('http://localhost:3000/post/all/' + locationId);
    return response.data;
}

async function getPost(userId: string) {
    const response = await api.get('http://localhost:3000/post/' + userId);
    return response.data;
}

async function createPost(data: CreatePostDto) {
    const response = await api.post('http://localhost:3000/post/', data);
    return response.data;
}

async function updatePost(data: UpdatePostDto) {
    const response = await api.put('http://localhost:3000/post/', data);
    return response.data;
}

async function deletePost(postId: string) {
    const response = await api.delete('http://localhost:3000/post/' + postId);
    return response.data;
}

async function storeImage(data: File) {
    let formData = new FormData();
    formData.append("file", data);
    const response = await api.post("http://localhost:3000/post/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response.status === 201) {
        return response.data;
    } else {
        return null;
    }
}

export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    storeImage
}
