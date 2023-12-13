import React from 'react';
import './profile-details.scss';
import { useSession } from '@/hooks';

const ProfileDetails: React.FC = (props: any) => {
    const { user } = useSession();
      
    return (
        <>
           <div className="card">
                <div className="card-body">
                    <div className="h5 text-blue">@{user?.userModel.profile.firstName}{user?.userModel.profile.lastName}</div>
                    <div className="h7 "><strong>Name :</strong> {user?.userModel.profile.firstName} {user?.userModel.profile.lastName}</div>
                    <div className="h7"><strong>About :</strong> Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js, etc.
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="h6 text-muted">Followers</div>
                        <div className="h5">5.2342</div>
                    </li>
                    <li className="list-group-item">
                        <div className="h6 text-muted">Following</div>
                        <div className="h5">6758</div>
                    </li>
                    <li className="list-group-item">
                        <div className="h6 text-muted">Friends</div>
                        <div className="h5">6758</div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileDetails;