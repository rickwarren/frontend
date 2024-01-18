import React, { useEffect, useRef, useState } from 'react';
import './profile-activity.scss';
import { getPosts } from '../../services/api/post/postApi';
import { getUser, getUserBySlug } from '../../services/api/user';
import { Button, Form, FormInstance } from 'antd';
import { useLocation } from 'react-router-dom';
import ProfileSidebar from './sidebar';
import MainContent from './main-content';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { useRouteLoaderData } from 'react-router-typesafe';


const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    // Watch all values
    const values = Form.useWatch([], form);
  
    React.useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
    }, [values]);
  
    return (
      <Button htmlType="submit" disabled={!submittable}>
        POST
      </Button>
    );
  };

const ProfileActivity: React.FC = (props: any) => {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const [form] = Form.useForm();
    const [posts, setPosts] = useState<any>();
    const [u, setU] = useState<UserDto>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    if(patharr[2] === 'profile') {
      setU(useRouteLoaderData('profile-user') as UserDto);
    } else {
      setU(useRouteLoaderData('user') as UserDto);
    }
    
    async function retrievePosts(usr: any) {
        try {
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
            setPosts(result);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
      let fetchData = async () => {
        retrievePosts(u);
        form.setFieldsValue({ authorId: user?.id, locationId: u?.profile?.id });
      }
      fetchData();
    }, [u]);

    return (
        <>
            <ProfileSidebar />
            <MainContent posts={posts} retrievePosts={retrievePosts} />
        </>
    );
}

export default ProfileActivity;