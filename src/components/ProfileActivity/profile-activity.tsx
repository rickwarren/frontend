import React, { useEffect, useRef, useState } from 'react';
import './profile-activity.scss';
import { useSession } from '@/hooks';
import { createPost, getPosts } from '@/services/api/post/postApi';
import { getUser } from '@/services/api/user';
import { Post } from '../Post';
import { Button, Form, FormInstance, Input, UploadFile, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { ProfileDetails } from '../ProfileDetails';
import { SupportedCharities } from '../SupportedCharities';
import CorporateSponsors from '../CorporateSponsors/corporate-sponsors';
import { createLocalFile } from '@/services/api/local-file';
import { ProfilePhotosBlock } from '../ProfilePhotosBlock';
import { ProfileCarousel } from '../ProfileCarousel';


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
    const [form] = Form.useForm();
    const [posts, setPosts] = useState<any>();
    const { user } = useSession();
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    
    const onChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        setImage(file.originFileObj);
    };
    
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => resolve(reader.result as string);
          });
        }
        const img = new Image();
        img.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = async (values: any) => {
        if(values.message.length > 1) {
            if(image) {
                const response = await createLocalFile(image);
                if(response) {
                    values.attachment = response.id;
                }
            }
            console.log(values);
            await createPost(values);
            form.resetFields();
            form.setFieldsValue({ authorId: user?.userModel.id, locationId: user?.userModel.profile.id });
            retrievePosts();
            setFileList([]);
            setImage(null);
        }
    }

     const authorIdProps = {
        hidden: true
     }

     const locationIdProps = {
        hidden: true
     }

    const sharedProps = {
        style: { width: '100%' },
        placeholder: "What's new with you?",
    };

    async function retrievePosts() {
        try {
            const response = await getPosts(user?.userModel.profile.id);
            const result = await Promise.all(response?.map(async(post: any) =>  {
                post.comments = await Promise.all(post.comments.map(async(comment: any) => {
                    comment.author = await getUser(comment.authorId);
                    comment.createdAt = new Date(comment.createdAt);
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
        retrievePosts();
        form.setFieldsValue({ authorId: user?.userModel.id, locationId: user?.userModel.profile.id });
    }, []);

    return (
        <>
        <div className="col-lg-5 left-sidebar">
                <ProfileDetails />
                <SupportedCharities />
                <CorporateSponsors />
                <ProfileCarousel />
            </div>
            <div className="col-lg-7 gedf-main">
                <div className="card social-timeline-card newpost">
                    <div className="card-body">
                    <div className="comments-input-wrapper">
                    <Form
                        name="post"
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div className="comments-input">
                            <div className="mr-2">
                                <img className="rounded-circle" width="30" src={'http://localhost:3000/upload/' + user?.userModel?.profile?.profilePhoto} alt=""/>
                            </div>
                            <div className="ml-2">
                            <Form.Item
                                name="message"
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea {...sharedProps} /> 
                            </Form.Item>
                            <Form.Item
                                name="authorId"
                            >
                                <Input {...authorIdProps} /> 
                            </Form.Item>
                            <Form.Item
                                name="locationId"
                            >
                                <Input {...locationIdProps} /> 
                            </Form.Item>
                            </div>
                        <ImgCrop rotationSlider>
                            <Upload
                                action="http://localhost:3000/post/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                            </ImgCrop>
                        <div className="submit-wrapper">
                            <Form.Item>
                                <SubmitButton form={form} />
                            </Form.Item>
                        </div>
                    </div>
                    </Form>  
                    </div>  
                    </div>
                </div>
                {
                posts ? posts?.map((post: any) => {
                return (
                    <div key={post.id} className="post-wrapper">
                        <Post post={post} retrievePosts={retrievePosts} />
                    </div>
                )
                }) : ''}
            </div>
        </>
    );
}

export default ProfileActivity;