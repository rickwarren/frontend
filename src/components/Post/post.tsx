import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, FormInstance, Input, Upload, UploadFile, UploadProps } from "antd";
import { useSession } from '@/hooks';
import { createComment } from '@/services/api/comment';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { createLocalFile } from '@/services/api/local-file';

dayjs.extend(relativeTime);

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
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

const Post = (props: any) => {
    const [form] = Form.useForm();
    const [showComments, setShowComments] = useState<boolean>(false);
    const [like, setLike] = useState<boolean>(false);
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

    const post = props.post;

    console.log(post);

    const onFinish = async (values: any) => {
        if(values.message.length > 1) {
            if(image) {
                const response = await createLocalFile(image);
                if(response) {
                    values.attachment = response.id;
                }
            }
            await createComment(values);
            form.resetFields();
            form.setFieldsValue({ authorId: user?.userModel.id, postId: post.id });
            await props.retrievePosts();
            setFileList([]);
            setImage(null);
        }
    }

    const authorIdProps = {
        hidden: true,
        initialvalue: user?.userModel.id
     }

     const postIdProps = {
        hidden: true,
        initialvalue: post.id
     }

    const sharedProps = {
        style: { width: '100%' },
        placeholder: 'Add a comment'
    };

    const toggleComments = () => {
        setShowComments(!showComments)
    }
    
    const toggleLike = () => {
        setLike(!like);
    }

    useEffect(() => {
        form.setFieldsValue({ authorId: user?.userModel.id, postId: post.id });
    }, []);

    return (
        <>
            <div className="card social-timeline-card">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle" width="45" src={'http://localhost:3000/upload/' + post?.author?.profile?.profilePhoto} alt=""/>
                            </div>
                            <div className="ml-2">
                                <div className="h5 m-0 text-blue">{post?.author?.profile?.firstName} {post?.author?.profile?.lastName}</div>
                                <div className="text-muted h7"><i className="fa-regular fa-clock"></i> {dayjs(post.createdAt).fromNow(true)} ago</div>
                            </div>
                        </div>
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop11" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop11">
                                    <div className="h6 dropdown-header">Configuration</div>
                                    <a className="dropdown-item" href="#/">Save</a>
                                    <a className="dropdown-item" href="#/">Hide</a>
                                    <a className="dropdown-item" href="#/">Report</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <span className="card-text">{post.message}</span>
                    {post.attachment ? (
                        <span className="post-attachment"><img src={'http://localhost:3000/upload/' + post.attachment} className="attachment" /></span>
                    ) : null }
                </div>
                <div className="card-footer">
                    <button type="button" className="card-link" onClick={toggleLike}><i className={like ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i></button>
                    {post?.comments?.length > 0 ? (<Badge color="blue" count={post?.comments?.length}><button type="button" className="card-link" onClick={toggleComments}><i className={showComments ? 'fa-solid fa-comment' : 'fa-regular fa-comment'}></i> Comment</button></Badge>) : (<button type="button" className="card-link" onClick={toggleComments}><i className={showComments ? 'fa-solid fa-comment' : 'fa-regular fa-comment'}></i> Comment</button>)}
                    <button type="button" className="card-link"><i className="fa fa-mail-forward"></i> Share</button>
                </div>
                <div className="comments-wrapper">
                { showComments ? post.comments.map((comment: any) => { return (
                    <div key={comment.id} className="card-body comment">
                        <div className="comments-wrapper">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="30" src={'http://localhost:3000/upload/' + comment?.author?.profile?.profilePhoto} alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <div className="h8 m-0 text-blue">{comment?.author?.profile?.firstName} {comment?.author?.profile?.lastName}</div><div className="timestamp h8"><i className="fa-regular fa-clock"></i> {dayjs(comment.createdAt).fromNow(true)} ago</div>
                                        <div className="text-muted">
                                            <span className="card-text">{comment.message}</span>
                                            {comment.attachment ? (
                                                <span className="comment-attachment"><img src={'http://localhost:3000/upload/' + comment.attachment} className="attachment" /></span>
                                            ) : null }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}) : ( post.comments[post.comments.length - 1] ? (
                <div key={post.comments[post.comments.length - 1]?.id} className="comments-wrapper">
                    <div className="card-body comment">
                        <div className="comments-wrapper">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="30" src={'http://localhost:3000/upload/' + post.comments[post.comments.length - 1]?.author?.profile?.profilePhoto} alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <div className="h8 m-0 text-blue">{post.comments[post.comments.length - 1]?.author?.profile?.firstName} {post.comments[post.comments.length - 1]?.author?.profile?.lastName}</div><div className="timestamp h8"><i className="fa-regular fa-clock"></i> {dayjs(post.comments[post.comments.length - 1]?.createdAt).fromNow(true)} ago</div>
                                        <div className="text-muted">
                                            <span className="card-text">{post.comments[post.comments.length - 1]?.message}</span>
                                            {post.comments[post.comments.length - 1]?.attachment ? (
                                                <span className="comment-attachment"><img src={'http://localhost:3000/upload/' + post.comments[post.comments.length - 1]?.attachment} className="attachment" /></span>
                                            ) : null }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null )}
                { showComments ? (
                    <div className="comments-input-wrapper">
                        <Form
                            name={'comment-' + post.id}
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
                                        name="postId"
                                    >
                                        <Input {...postIdProps} /> 
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
                            </div>
                            <div className="comment-submit-wrapper">
                                <Form.Item>
                                    <SubmitButton form={form} />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                ) : null }
                </div>
            </div>
        </>
    )
}

export default Post;