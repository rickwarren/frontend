import React, { useEffect, useState } from 'react';
import './profile-details.scss';
import { useSession } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { getUserBySlug } from '../../services/api/user';
import { useFetchUserByUrlStringQuery, useFetchUserQuery } from '../../features/api/api-slice';

const ProfileDetails: React.FC = (props: any) => {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    const {data = [], isFetching} = useFetchUserByUrlStringQuery(patharr[2]);
      
    useEffect(() => {
        if(patharr[1] === 'profile') {
            setU(data);
        } else {
            setU({ user });
        }
    }, [isFetching]);
    
    return (
        <>
           <div className="card">
                <div className="card-body">
                    <div className="h5 text-blue">@{u?.urlString ? u?.urlString : user?.userModel?.urlString}</div>
                    <div className="h7"><strong>About :</strong> Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js, etc.</div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <i className="fa-solid fa-home" /> lives in {u?.profile ? u?.profile?.city : user?.userModel?.profile?.city}
                    </li>
                    <li className="list-group-item">
                        <i className="fa-solid fa-location-dot" /> from {u?.profile ? u?.profile?.hometown : user?.userModel?.profile?.hometown}
                    </li>
                    <li className="list-group-item">
                        <i className="fa-solid fa-suitcase" /> works at {u?.profile ? u?.profile?.employer : user?.userModel?.profile?.employer}
                    </li>
                    <li className="list-group-item">
                        <i className="fa-solid fa-heart" /> is {u?.profile ? u?.profile?.relationshipStatus : user?.userModel?.profile?.relationshipStatus}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileDetails;