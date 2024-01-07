import { AutoComplete, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import EasyEdit from "react-easy-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faCheck, faEnvelope, faHeart, faHome, faMapPin, faMobile, faNeuter, faTimes, faTowerBroadcast, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import './profile-about.scss';
import { useSession } from '../../hooks';
import { ProfileDto } from '../../services/api/profile/dto/profile.dto';
import { getProfile } from '../../services/api/profile';
import { useLocation } from 'react-router-dom';
import { getUserBySlug } from '../../services/api/user';

const ProfileAbout: React.FC = (props: any) => {
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const { user } = useSession();
    const patharr = path.split('/');
    const [profile, setProfile] = useState<ProfileDto>();

    useEffect(() => {
        if(user) {
            getProfile(user.id).then((p) => {
                setProfile(p);
            });
        }
    }, []);

    useEffect(() => {
        if(patharr[1] == 'profile') {
            getUserBySlug(patharr[2]).then((usr) => {
                setU(usr);
                getProfile(usr.id).then((p) => {
                    setProfile(p);
                });
            });
        } else {
            if(user) {
                setU(user);
                getProfile(user.id).then((p) => {
                    setProfile(p);
                });
            }
        }
    }, []);

    return (
        <>
            <div className="profile-about">
                <div className="col-lg-12 gedf-main">
                    <div className="card social-timeline-card newpost">
                        <div className="card-body">
                            <Tabs
                                tabPosition="left"
                                items={[{
                                    label: `Overview`,
                                    key: 'overview',
                                    children: (
                                        <>
                                            <ul className="overview">
                                                <li>
                                                    <FontAwesomeIcon icon={faHome} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add city"
                                                        value={profile?.city}
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faMapPin} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add hometown"
                                                        value={profile?.hometown}
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add relationship status"
                                                        value={profile?.relationshipStatus}
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                }, 
                                {
                                    label: `Work history`,
                                    key: 'work',
                                    children: (
                                        <>
                                            <ul className="work-history">
                                                <li>
                                                    <FontAwesomeIcon icon={faBriefcase} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add employer"
                                                        value={profile?.employer}
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faCalendar} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add date hired"
                                                        value={profile?.dateHired}
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faTowerBroadcast} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add employment status"
                                                        value={profile?.employmentStatus}                                                                                      
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                },
                                {
                                    label: `Contact and basic info`,
                                    key: 'contact',
                                    children: (
                                        <>
                                            <ul className="contact-info">
                                                <li>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add email"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faMobile} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add mobile number"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <hr />
                                                <li>
                                                    <FontAwesomeIcon icon={faUser} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add first name"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faUserTie} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add last name"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faCalendar} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add date of birth"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faNeuter} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add gender"
                                                        onSave={(val: string) => console.log(val)}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                }]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileAbout;