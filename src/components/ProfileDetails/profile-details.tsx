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
                    <div className="h7"><strong>About :</strong> Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js, etc.</div>
                </div>
                <ul className="list-group list-group-flush">
                    { user?.userModel?.profile?.city ? ( 
                        <>
                            <li className="list-group-item">
                                <i className="fa-solid fa-home" /> lives in {user?.userModel?.profile?.city}
                            </li>
                        </>
                    ) : null }
                    { user?.userModel?.profile?.hometown ? ( 
                        <>
                            <li className="list-group-item">
                                <i className="fa-solid fa-location-dot" /> from {user?.userModel?.profile?.hometown}
                            </li>
                        </>
                    ) : null }
                    { user?.userModel?.profile?.employer ? ( 
                        <>
                            <li className="list-group-item">
                                <i className="fa-solid fa-suitcase" /> works at {user?.userModel?.profile?.employer}
                            </li>
                        </>
                    ) : null }
                    { user?.userModel?.profile?.relationshipStatus ? ( 
                        <>
                            <li className="list-group-item">
                                <i className="fa-solid fa-heart" /> is {user?.userModel?.profile?.relationshipStatus}
                            </li>
                        </>
                    ) : null }
                </ul>
            </div>
        </>
    );
}

export default ProfileDetails;