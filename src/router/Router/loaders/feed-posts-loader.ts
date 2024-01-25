import React from 'react';
import { getFriendsByUserId } from "../../../services/api/friend-list";
import { getPosts } from "../../../services/api/post";
import { getCurrentUser, getUser } from "../../../services/api/user";

export async function retrieveFriendPosts(usrs: any) {
    try {
        usrs = await Promise.all(usrs);
        let friendPosts: any = [];
        await Promise.all(usrs.map(async (usr: any) => {
            const response = await getPosts(usr?.data?.profile?.id ? usr?.data?.profile?.id : '');
            const result = await Promise.all(response?.map(async(post: any) =>  {
                post.comments = await Promise.all(post.comments.map(async(comment: any) => {
                    comment.author = await getUser(comment.authorId);
                    comment.creataedAt = new Date(comment.createdAt);
                    comment.updatedAt = new Date(comment.updatedAt);
                    return comment;
                }));
                post.createdAt = new Date(post.createdAt);
                post.updatedAt = new Date(post.updatedAt);
                post.author = await getUser(post.authorId);
                return post;
            }));
            friendPosts = [...result];
            return friendPosts;
        }));
        return friendPosts;
    } catch(e) {
        console.log(e);
    }
}

export const feedPostsLoader = async () => {
    const user = await getCurrentUser();
    const response = await getFriendsByUserId(user.id)
    return await retrieveFriendPosts(response?.users);
}