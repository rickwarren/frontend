import { AutoComplete, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import EasyEdit from "react-easy-edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar, faCheck, faEnvelope, faHeart, faHome, faMapPin, faMobile, faNeuter, faTimes, faTowerBroadcast, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import './profile-about.scss';
import { useSession } from '../../hooks';
import { ProfileDto } from '../../services/api/profile/dto/profile.dto';
import { getProfile, updateProfile } from '../../services/api/profile';
import { useLocation } from 'react-router-dom';
import { getUserBySlug, updateUser } from '../../services/api/user';

const ProfileAbout: React.FC = (props: any) => {
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user);
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const patharr = path.split('/');
    const [profile, setProfile] = useState<ProfileDto>();

    const fetchData = async () => {
        if(patharr[1] == 'profile') {
            const usr = await getUserBySlug(patharr[2])
            setU(usr);
            const p = await getProfile(usr.id)
            setProfile(p);
        } else {
            if(user) {
                setU(user);
                const p = await getProfile(user.id)
                setProfile(p);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {u ? (
            <div className="profile-about">
                <div className="col-lg-12 gedf-main">
                    <div className="card social-timeline-card about">
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.city = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.hometown = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.relationshipStatus = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.employer = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.dateHired = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
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
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.employmentStatus = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                },
                                {
                                    label: `Contact`,
                                    key: 'contact',
                                    children: (
                                        <>
                                            <ul className="contact-info">
                                                <li>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add email"
                                                        value={u.email}
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newUser = u;
                                                                newUser.email = val;
                                                                updateUser(newUser);
                                                                setU(newUser);
                                                                fetchData();
                                                            }
                                                        }}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faMobile} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add mobile number"
                                                        value={profile?.mobilePhone}
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.mobilePhone = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                                fetchData();
                                                            }
                                                        }}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                },
                                {
                                    label: `Basic Info`,
                                    key: 'basic',
                                    children: (
                                        <>
                                            <ul className="basic-info">
                                                <li>
                                                    <FontAwesomeIcon icon={faUser} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add first name"
                                                        value={profile?.firstName}
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.firstName = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                            }
                                                        }}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faUserTie} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add last name"
                                                        value={profile?.lastName}
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.lastName = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                            }
                                                        }}
                                                        saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                                                        cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />}
                                                    />
                                                </li>
                                                <li>
                                                    <FontAwesomeIcon icon={faCalendar} />
                                                    <EasyEdit
                                                        type="text"
                                                        placeholder="Add date of birth"
                                                        onSave={(val: string) => {
                                                            if(profile) {
                                                                let newProfile = profile;
                                                                newProfile.dateOfBirth = val;
                                                                updateProfile(newProfile);
                                                                setProfile(newProfile);
                                                            }
                                                        }}
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
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

export default ProfileAbout;