import React, { useEffect, useState } from 'react'
import { Post } from '../../components/Post';
import { useLocation } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchQuery } from '../../services/api/search/searchApi';
import { getUser } from '../../services/api/user/userApi';

export const SearchResultsPosts = () => {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [posts, setPosts] = useState<any>();

    async function retrievePosts(usr: any) {
        try {
            const response: SearchResultsDto = await searchQuery(patharr[1]);
            const result = await Promise.all(response?.posts.map(async(post: any) =>  {
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
            setPosts(result);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await retrievePosts(null)
        }
        fetchData();
    }, [path])
    
    return posts && posts.length > 0 ? (
        <div className="posts-container">
            <h1>Posts</h1>
            {posts ? posts.map((post: any) => {
                console.log(post);
                return (
                <div key={post.id} className="post-wrapper">
                    <Post post={post} retrievePosts={retrievePosts} />
                </div>
                )
            }) : (
                <div>Loading...</div>
            )}
        </div>
    ) : ''
}