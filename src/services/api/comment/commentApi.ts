import { api } from '@/services';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

async function getComments() {
    const response = await api.get('http://localhost:3000/comment/all');
    return response.data;
}

async function getCommentsForPost(postId: string) {
    const response = await api.get('http://localhost:3000/comment/post/{postId}');
    return response.data;
}

async function getComment(userId: string) {
    const response = await api.get('http://localhost:3000/comment/{userId}');
    return response.data;
}

async function createComment(data: CreateCommentDto) {
    const response = await api.post('http://localhost:3000/comment/', data);
    return response.data;
}

async function updateComment(data: UpdateCommentDto) {
    const response = await api.put('http://localhost:3000/comment/', data);
    return response.data;
}

async function deleteComment(id: string) {
    const response = await api.delete('http://localhost:3000/comment/{id}');
    return response.data;
}

export {
    getComments,
    getCommentsForPost,
    getComment,
    createComment,
    updateComment,
    deleteComment
}
