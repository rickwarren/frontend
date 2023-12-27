import React from 'react';
import './profile-following.scss';
import { ProfilePeople } from '../../components/ProfilePeople';


function ProfileFollowing() {
	return (
        <>
        <div className="col-lg-8 gedf-main profile-following">
		<div className="card social-timeline-card">
                <div className="card-body">
                    <h5 className="card-title">Following (8)</h5>
                    <ul className="friend-list">
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                        <li>
                            <div className="left"> 
                                <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" />
                            </div>
                            <div className="right">
                                <h3>John Doe</h3>
                                <p>10 Friends</p>
                            </div>
                        </li>
                    </ul>
                </div>
           </div>
           </div>
        <ProfilePeople />
        </>
	);
}
export default ProfileFollowing;