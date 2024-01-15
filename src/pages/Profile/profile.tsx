import React, { useEffect, useState } from 'react';
import './profile.scss';
import '../../styles/bootstrap.min.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks';
import { getUserBySlug } from '../../services/api/user';
import { PostDto } from '../../services/api/post/dto/post.dto';
import { UploadFile, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import { getProfile, updateProfile } from '../../services/api/profile';
import ImgCrop from 'antd-img-crop';
import { ProfileDto } from '../../services/api/profile/dto/profile.dto';
import { dateToYYYYMMDD_HHMM, formatDate } from '../../utils/date';
import { createLocalFile } from '../../services/api/local-file';
import { useFetchUserByUrlStringQuery } from '../../features/api/api-slice';
import { getFriendsByUserId } from '../../services/api/friend-list';
import { createFriendRequest, getFriendRequestsByUserId } from '../../services/api/friend-request';
import { Loader } from '../../components/Loader';

const Profile: React.FC = () => {
    let usr: any = localStorage.getItem('user')
    usr = JSON.parse(usr);

    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
      } = useFetchUserByUrlStringQuery(patharr[2]);
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [friend, setFriend] = useState<boolean>(false);
    const [friendRequested, setFriendRequested] = useState<boolean>(false);
    
    const onChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        setImage(file.originFileObj)
        const profile: ProfileDto = await getProfile(usr?.id ? usr?.id : '');
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

    const messageFriend = async () => {
        console.log('open message window');
    }

    const requestFriend = async () => {
        if(user) {
            await createFriendRequest({
                requesterId: user?.id,
                addresseId: usr?.id ? usr.id : '',
                status: 'pending'
            });
            setFriendRequested(true);
        }
    }

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await getFriendsByUserId(user?.id);
            if(response?.users.includes(usr)) {
                setFriend(true);
            } else {
                setFriend(false);
            }
        }
        const fetchFriendRequest = async () => {
            if(user) {
                const response = await getFriendRequestsByUserId(user?.id);
                response.forEach((request: any) => {
                    if(request.addresseId === usr?.id || request.requesterId === usr?.id) {
                        setFriendRequested(true);
                    }
                })
            }
        }
        fetchFriends();
        fetchFriendRequest();
        setFileList([
            {
                uid: '-1',
                name: '',
                status: 'done',
                url: 'http://localhost:3000/upload/' + usr?.profile?.profilePhoto,
            },
        ]);
    }, [isSuccess]);

return (
    <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"/>
        <main>
            <div className='container myprofile'>
                <div className="wrapper">
                    <div className="heading">
                        <div className="img"></div>
                            <div className="card social-prof">
                                <div className="card-body">
                                    <div className="wrapper">
                                        {isLoading ? (
                                            <Loader />
                                        ) : (
                                            <>
                                                <div className="rotate-profile">
                                                    <div className="prof-card">
                                                        <span className="ant-upload-wrapper css-dev-only-do-not-override-6j9yrn ant-upload-picture-card-wrapper">
                                                            <div className="ant-upload-list ant-upload-list-picture-card">
                                                                <div className="ant-upload-list-item-container">
                                                                    <div className="ant-upload-list-item ant-upload-list-item-done">
                                                                        <a href="#" className="ant-upload-list-item-thumbnail">
                                                                            <img src={'http://localhost:3000/upload/' + user?.profile?.profilePhoto} className="ant-upload-list-item-image" />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                        <img src="./src/assets/coca-cola-4.svg" className="profile-back" />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="details">
                                            <h3>{user?.profile?.firstName} {user?.profile?.lastName}</h3>
                                            <p>{user?.profile?.profession}</p>
                                        </div>
                                        <div className="friend-wrapper">
                                            {friend ? (
                                                <button className="btn btn-primary" onClick={messageFriend}>Send a message</button>
                                            ) : friendRequested ? (
                                                <button className="btn btn-primary" disabled>Friend request sent</button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={requestFriend}>Send Friend Request</button>
                                            )}
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
