import React, { useEffect, useState } from 'react';
import './profile.scss';
import '../../styles/bootstrap.min.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { getProfile, updateProfile } from '../../services/api/profile';
import { ProfileDto } from '../../services/api/profile/dto/profile.dto';
import { dateToYYYYMMDD_HHMM } from '../../utils/date';
import { createLocalFile } from '../../services/api/local-file';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { getCurrentUser, getUserBySlug } from '../../services/api/user';
import { getCharityByName } from '../../services/api/charity/charityApi';

const Charity: React.FC = () => {
    const [user, setUser] = useState<UserDto>();
    const [charity, setCharity] = useState<any>();
    const [image, setImage] = useState<any>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    
    const onChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        setImage(file.originFileObj)
        const profile: ProfileDto = await getProfile(user?.id ? user?.id : '');
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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCurrentUser()
            const result = await getCharityByName(patharr[2])
            setUser(response);
            setCharity(result);
            setFileList([
                {
                    uid: '-1',
                    name: '',
                    status: 'done',
                    url: 'http://localhost:3000/upload/' + result?.logo,
                },
            ]);
        }
        fetchData();
    }, []);

return (
    <div> 
        {charity ? (
            <>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet"/>
        <main>
            <div className='container myprofile'>
                <div className="wrapper">
                    <div className="heading">
                        <div className="img"></div>
                            <div className="card social-prof">
                                <div className="card-body">
                                    <div className="wrapper">
                                        <div className="rotate-profile">
                                            <div className="prof-card">
                                                <span className="ant-upload-wrapper css-dev-only-do-not-override-6j9yrn ant-upload-picture-card-wrapper">
                                                    <div className="ant-upload-list ant-upload-list-picture-card">
                                                        <div className="ant-upload-list-item-container">
                                                            <div className="ant-upload-list-item ant-upload-list-item-done">
                                                                <a href="#" className="ant-upload-list-item-thumbnail">
                                                                    <img src={'http://localhost:3000/upload/' + charity?.logo} className="ant-upload-list-item-image" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <img src="./src/assets/coca-cola-4.svg" className="profile-back" />
                                            </div>
                                        </div>
                                        <div className="details">
                                            <h3>{charity?.name}</h3>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-12">
                                            <ul className=" nav nav-tabs justify-content-center s-nav">
                                                <li><Link className={ location.pathname === 'activity' ? 'active' : '' } to="activity">Timeline</Link></li>
                                                <li><Link className={ location.pathname === 'about' ? 'active' : '' } to="about">About</Link></li>
                                                <li><Link className={ location.pathname === 'donations' ? 'active' : '' } to="donations">Donations</Link></li>
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
                        <div className="content-wrapper">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>  
            </>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )}
        </div> 
    );
}
export default Charity;
