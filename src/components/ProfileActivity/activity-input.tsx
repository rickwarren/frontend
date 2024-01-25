import { Button, Form, FormInstance, Input, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'
import React, { useEffect, useState } from 'react'
import { createLocalFile } from '../../services/api/local-file'
import { createPost } from '../../services/api/post'
import { useLocation } from 'react-router-dom'
import { UserDto } from '../../services/api/user/dto/user.dto'
import { getCurrentUser, getUserBySlug } from '../../services/api/user'

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

const ActivityInput = (props: any) => {
    const [user, setUser] = useState<UserDto>();
    const [form] = Form.useForm();
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    
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
            await createPost(values);
            form.resetFields();
            form.setFieldsValue({ authorId: user?.id, locationId: u?.profile?.id || '' });
            props.retrievePosts(u);
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

    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();
            setUser(user);
            if(patharr[1] === 'profile') {
                setU(await getUserBySlug(patharr[2]));
            } else {
                setU(user);
            }
        }
        fetchData();
        form.setFieldsValue({ authorId: user?.id, locationId: u?.profile?.id });
    }, []);

    return (
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
                                <img className="rounded-circle" width="30" src={'http://localhost:3000/upload/' + u?.profile ? u?.profile?.profilePhoto : ''} alt=""/>
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
    )
}

export default ActivityInput;