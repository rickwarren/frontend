import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from "antd";
import { useSession } from '@/hooks';
import { createComment } from '@/services/api/comment';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
        Submit
      </Button>
    );
  };

const Post = (props: any) => {
    const [form] = Form.useForm();
    const [showComments, setShowComments] = useState<boolean>(false);
    const [like, setLike] = useState<boolean>(false);
    const { user } = useSession();

    const post = props.post;

    const onFinish = async (values: any) => {
        console.log(values);
        await createComment(values);
        form.resetFields();
        form.setFieldsValue({ authorId: user?.userModel.id, postId: post.id });
        await props.retrievePosts();
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
                                <img className="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                            </div>
                            <div className="ml-2">
                                <div className="h5 m-0 text-blue">{post?.author?.profile?.firstName} {post?.author?.profile?.lastName}</div>
                                <div className="text-muted h7"><i className="fa-regular fa-clock"></i> {dayjs(post.createdAt).fromNow(true)}</div>
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
                </div>
                <div className="card-footer">
                    <button type="button" className="card-link" onClick={toggleLike}><i className={like ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i></button>
                    <button type="button" className="card-link" onClick={toggleComments}><i className={showComments ? 'fa-solid fa-comment' : 'fa-regular fa-comment'}></i> Comment</button>
                    <button type="button" className="card-link"><i className="fa fa-mail-forward"></i> Share</button>
                </div>
                    { post.comments.map((comment: any) => {
                    return (
                    <div key={comment.id} className="card-body comment">
                        <div className="comments-wrapper">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="25" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                </div>
                                <div className="ml-2">
                                    <div className="h8 m-0 text-blue">{comment?.author?.profile?.firstName} {comment?.author?.profile?.lastName}</div><div className="timestamp h8"><i className="fa-regular fa-clock"></i> {dayjs(comment.createdAt).fromNow(true)}</div>
                                    <div className="text-muted">
                                        <span className="card-text">{comment.message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
                    })} 
                <div className="comments-input-wrapper">
                { showComments ? (
                    <>
                    <Form
                        name="comment"
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
                                    name="postId"
                                >
                                    <Input {...postIdProps} /> 
                                </Form.Item>
                            </div>
                        </div>
                        <div className="comment-submit-wrapper">
                            <Form.Item>
                                <SubmitButton form={form} />
                            </Form.Item>
                        </div>
                    </Form>
                    </>
                ) : null }
                </div>
            </div>
        </>
    )
}

export default Post;