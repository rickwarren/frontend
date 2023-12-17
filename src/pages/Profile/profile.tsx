import React, { useEffect, useState } from 'react';
import './profile.scss';
import '../../styles/bootstrap.min.css';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useSession } from '@/hooks';
import { ProfileDetails } from '@/components/ProfileDetails';
import { ProfileCarousel } from '@/components/ProfileCarousel';
import { ProfilePeople } from '@/components/ProfilePeople';
import { getPosts, storeImage } from '@/services/api/post';
import { PostDto } from '@/services/api/post/dto/post.dto';
import { UploadFile, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import { getProfile, updateProfile } from '@/services/api/profile';
import ImgCrop from 'antd-img-crop';
import { ProfileDto } from '@/services/api/profile/dto/profile.dto';
import { dateToYYYYMMDD_HHMM, formatDate } from '@/utils/date';

function Profile() {
    const { params } = useParams();
    console.log(params);
    let { user } = useSession();
    const [posts, setPosts] = useState<PostDto[]>();
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: '',
          },
    ]);
    
    const onChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        setImage(file.originFileObj);
        if(user) {
            const profile: ProfileDto = await getProfile(user.id);
            if(image) {
                const response = await storeImage(image);
                console.log(response);
                if(response) {
                    profile.profilePhoto = response;
                    const ud = new Date(profile.updatedAt);
                    profile.updatedAt = dateToYYYYMMDD_HHMM(ud);
                    const cd = new Date(profile.createdAt);
                    profile.createdAt = dateToYYYYMMDD_HHMM(cd);
                    console.log(profile);
                    await updateProfile(profile);
                }
            }
        }
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

    async function retrievePosts() {
        try {
            const response = await getPosts(user?.userModel?.profile?.id);
            setPosts(response);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        retrievePosts();
    }, []);

	return (
		<div>
			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"/>
<main>
    <div className="container">
        <div className="wrapper">
            <div className="heading">
                <div className="img" style={{/*    background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 350px;background-size: cover;*/}}></div>
                <div className="card social-prof">
                    <div className="card-body">
                        <div className="wrapper">
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
                            <div className="details">
                                <h3>{user?.userModel?.profile?.firstName} {user?.userModel?.profile?.lastName}</h3>
                                <p>{user?.userModel?.profile?.profession}</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-lg-12">
                                <ul className=" nav nav-tabs justify-content-center s-nav">
                                    <li><Link className="active" to="activity">Timeline</Link></li>
                                    <li><Link to="about">About</Link></li>
                                    <li><Link to="friends">Friends</Link></li>
                                    <li><Link to="photos">Photos</Link></li>
                                    <li><Link to="videos">Videos</Link></li> 
                                    <li><Link to="followers">Followers</Link></li>
                                    <li><Link to="following">Following</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <Outlet />
        </div>
    </div>
</main>
		</div>
	);
}
export default Profile;