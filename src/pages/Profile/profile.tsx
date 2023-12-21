import React, { useEffect, useState } from 'react';
import './profile.scss';
import '../../styles/bootstrap.min.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSession } from '@/hooks';
import { getPosts } from '@/services/api/post';
import { PostDto } from '@/services/api/post/dto/post.dto';
import { UploadFile, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import { getProfile, updateProfile } from '@/services/api/profile';
import ImgCrop from 'antd-img-crop';
import { ProfileDto } from '@/services/api/profile/dto/profile.dto';
import { dateToYYYYMMDD_HHMM, formatDate } from '@/utils/date';
import { createLocalFile } from '@/services/api/local-file';

const Profile: React.FC = (props: any) => {
    let { user } = useSession();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostDto[]>();
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: '',
            status: 'done',
            url: 'http://localhost:3000/upload/' + user?.userModel?.profile?.profilePhoto,
        },
    ]);
    
    const onChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        setImage(file.originFileObj);
        if(user) {
            const profile: ProfileDto = await getProfile(user.id);
            if(image) {
                const response = await createLocalFile(image);
                if(response) {
                    profile.profilePhoto = response.id;
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
        img.setAttribute('src', src);
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
                <div className="img"></div>
                <div className="card social-prof">
                    <div className="card-body">
                        <div className="wrapper">
                            <div className="rotate-profile">
                                <div className="prof-card">
                                    <ImgCrop rotationSlider cropShape="round">
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
                                    <img src="./src/assets/coca-cola-4.svg" className="profile-back" />
                                </div>
                            </div>
                            <div className="details">
                                <h3>{user?.userModel?.profile?.firstName} {user?.userModel?.profile?.lastName}</h3>
                                <p>{user?.userModel?.profile?.profession}</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-lg-12">
                                <ul className=" nav nav-tabs justify-content-center s-nav">
                                    <li><Link className={ location.pathname === 'activity' ? 'active' : '' } to="activity">Timeline</Link></li>
                                    <li><Link className={ location.pathname === 'about' ? 'active' : '' } to="about">About</Link></li>
                                    <li><Link className={ location.pathname === 'friends' ? 'active' : '' } to="friends">Friends</Link></li>
                                    <li><Link className={ location.pathname === 'photos' ? 'active' : '' } to="photos">Photos</Link></li>
                                    <li><Link className={ location.pathname === 'videos' ? 'active' : '' } to="videos">Videos</Link></li> 
                                    <li><Link className={ location.pathname === 'followers' ? 'active' : '' } to="followers">Followers</Link></li>
                                    <li><Link className={ location.pathname === 'following' ? 'active' : '' } to="following">Following</Link></li>
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