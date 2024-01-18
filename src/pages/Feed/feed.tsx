import React, { useEffect, useState } from 'react';
import './feed.scss';
import { MenuProps } from 'antd';
import { getPosts } from '../../services/api/post';
import { Post } from '../../components/Post';
import { getUser } from '../../services/api/user';
import { ChatWidget } from '../../components/ChatWidget';
import ActivityInput from '../../components/ProfileActivity/activity-input';
import FeedMenu from './feed-menu';
import { useRouteLoaderData } from 'react-router-typesafe';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { PostDto } from '../../services/api/post/dto/post.dto';

    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log('click ', key);
    };


const items: MenuProps['items'] = [
    {
      label: 'Save',
      key: '0',
    },
    {
      label: 'Hide',
      key: '1',
    },
    {
      label: 'Report',
      key: '3',
    },
];  

const Feed: React.FC = (props: any) => {
    const friendPosts: PostDto[] = useRouteLoaderData('friend-posts') as PostDto[];
    const user: UserDto | boolean = useRouteLoaderData('user') as UserDto;
    const [posts, setPosts] = useState<any>(friendPosts);

    async function retrieveFriendPosts(usrs: any) {
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
            setPosts(friendPosts);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <FeedMenu />
            <div className="row">
                <div className="col-lg-7 gedf-main feed-wrapper">
                    <ActivityInput />
                    {posts ? posts?.map((post: any) => {
                        return (
                            <div key={post.id} className="post-wrapper">
                                <Post post={post} retrieveFriendPosts={retrieveFriendPosts} />
                            </div>
                        )
                    }) : ''}         
                </div>
            </div>
            <div className="ad-wrapper">
                <a href="#">
                    <img src="src/assets/walmart-ad.webp" height="200" />
                </a>
            </div>
            <ChatWidget />
        </>
    );
}

export default Feed;