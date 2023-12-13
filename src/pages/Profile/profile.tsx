import React, { useEffect, useState } from 'react';
import './profile.scss';
import '../../styles/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom';
import { useSession } from '@/hooks';
import { ProfileDto } from '@/services/api/profile/dto/profile.dto';
import { ProfileDetails } from '@/components/ProfileDetails';
import { ProfileCarousel } from '@/components/ProfileCarousel';
import { ProfilePeople } from '@/components/ProfilePeople';
import { getProfile } from '@/services/api/profile';
import { getPosts } from '@/services/api/post';
import { PostDto } from '@/services/api/post/dto/post.dto';



function Profile() {
    const { user } = useSession();
    const [posts, setPosts] = useState<PostDto[]>();

    async function retrievePosts() {
        try {
            const response = await getPosts(user?.userModel.profile.id);
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
        <div className="img" style={{/*    background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 350px;background-size: cover;*/}}></div>
        <div className="card social-prof">
            <div className="card-body">
                <div className="wrapper">
                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" className="user-profile"/>
                    <h3>{user?.userModel.profile.firstName} {user?.userModel.profile.lastName}</h3>
                    <p>{user?.userModel.profile.profession}</p>
                </div>
                <div className="row ">
                    <div className="col-lg-12">
                        <ul className=" nav nav-tabs justify-content-center s-nav">
                            <li><Link className="active" to="activity">Timeline</Link></li>
                            <li><a href="#/">About</a></li>
                            <li><a href="#/">Friends</a></li>
                            <li><a href="#/">Photos</a></li>
                            <li><a href="#/">Videos</a></li>
                            <li><a href="#/">Followers</a></li>
                            <li><a href="#/">Following</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-3">
                <ProfileDetails />
                <ProfileCarousel />
            </div>
            <div className="col-lg-6 gedf-main">
                <Outlet />                
            </div>
            <div className="col-lg-3">
                <ProfilePeople />
            </div>
        </div>
    </div>
</main>
		</div>
	);
}
export default Profile;