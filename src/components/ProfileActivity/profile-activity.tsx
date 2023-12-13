import React, { useEffect, useRef, useState } from 'react';
import './profile-activity.scss';
import { useSession } from '@/hooks';
import { createPost, getPosts, storeImage } from '@/services/api/post/postApi';
import { getUser } from '@/services/api/user';
import { Post } from '../Post';
import { Button, Form, FormInstance, Input, UploadFile, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { UploadRequestOption } from 'rc-upload/lib/interface';

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
    const fileInputRef = useRef<HTMLInputElement>();
    const [form] = Form.useForm();
    const [posts, setPosts] = useState<any>();
    const { user } = useSession();
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    
    const onChange: UploadProps['onChange'] = ({ event, file, fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(newFileList);
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
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = async (values: any) => {
        if(values.message.length > 1) {
            if(preview) {
                const response = await storeImage(preview);
                console.log(response);  
            //    values.attachment = image;
            }
            await createPost(values);
            form.resetFields();
            form.setFieldsValue({ authorId: user?.userModel.id, locationId: user?.userModel.profile.id });
            retrievePosts();
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
            console.log(result);
            setPosts(result);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        retrievePosts();
        form.setFieldsValue({ authorId: user?.userModel.id, locationId: user?.userModel.profile.id });
    }, []);
    
    useEffect(() => {
        if (image) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(image);
        } else {
          setPreview(undefined)
        }
      }, [image]);
        

    return (
        <>
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
                            <img className="rounded-circle" width="25" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
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
                        <Form.Item
                            name="attachment"
                        >
                            {preview ? (
                                <img src={preview} className="upload-preview" alt={"preview"} style={{ objectFit: "cover" }} />
                            ) : (
                            <>
                                <Button 
                                    className="upload-preview"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        fileInputRef?.current?.click();
                                    }}
                                >
                                + Upload
                                </Button>
                            <input type="file" style={{ display: "none" }} 
                                className="upload-preview"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(event: any) => {
                                  const file = event.target.files[0];
                                  if (file && file.type.substr(0, 5) === "image") {
                                    setImage(file);
                                  } else {
                                    setImage(undefined);
                                  }
                                }} 
                            />
                          </>
                            )}
                        </Form.Item>
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
                console.log(post);
            return (
                <div key={post.id} className="post-wrapper">
                    <Post post={post} retrievePosts={retrievePosts} />
                </div>
            )
            }) : ''}
        </>
    );
}

export default ProfileActivity;