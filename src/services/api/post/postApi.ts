import { api } from '@/services';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

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

async function storeImage(i: string) {
    const data = { image: i };
    const response = await api.post('http://localhost:3000/post/upload', data);
    return response;
}

export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    storeImage
}
