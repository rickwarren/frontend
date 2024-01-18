import React, { useEffect, useState } from 'react';
import './search-results.scss';
import { useSession } from '../../hooks';
import { MenuProps } from 'antd';
import { getFriendsByUserId } from '../../services/api/friend-list';
import { getPosts } from '../../services/api/post';
import { Post } from '../../components/Post';
import { getUser } from '../../services/api/user';
import { ProfilePeople } from '../../components';
import { ChatWidget } from '../../components/ChatWidget';
import ActivityInput from '../../components/ProfileActivity/activity-input';
import FeedMenu from './search-menu';
import SearchMenu from './search-menu';
import { Outlet } from 'react-router-dom';

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

const SearchResults: React.FC = (props: any) => {
    const { user } = useSession();
    const [posts, setPosts] = useState<any>([]);

    async function retrieveFriendPosts(usrs: any) {
        try {
            let friendPosts: any = [];
            await Promise.all(usrs.map(async (usr: any) => {
                const response = await getPosts(usr?.profile?.id ? usr?.profile?.id : user?.userModel?.profile?.id);
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFriendsByUserId(user?.id)
            await retrieveFriendPosts(response?.users);
        }
        fetchData();
    }, [user]);

    return (
        <>
            <SearchMenu />
            <div className="row">
                <div className="col-lg-7 gedf-main feed-wrapper">
                    <Outlet />       
                </div>
            </div>
            <ChatWidget />
        </>
    );
}

export default SearchResults;