import { useSession } from '@/hooks';
import { getPhotos } from '@/services/api/photo';
import { getUserBySlug } from '@/services/api/user';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfileCarousel: React.FC = (props: any) => {
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const { user } = useSession();
    const patharr = path.split('/');
    const [photos, setPhotos] = useState<string[]>([]);

    const retrievePhotos = async (usr: any) => {
        const photoList = await getPhotos(usr?.id ? usr?.id : user?.id);
        if(photoList) {
            const list = photoList.map((photo) => {
                return 'http://localhost:3000/upload/' + photo.localFileId;
            });
            const photosList = [];
            for(let i = 0; i < 9; i++) {
                photosList.push(list[i]);
            }
            setPhotos(photosList);
        }
    }

    useEffect(() => {
        if(patharr[1] === 'profile') {
            getUserBySlug(patharr[2]).then((usr) => {
                setU(usr);
                retrievePhotos(usr);
            });
        } else {
            setU(user);
            retrievePhotos(user);
        }
    }, []);

    return (
        <>
            <div className="card latest-photos">
                <div className="card-body">
                    <div className="latest-photos-title">
                        <h3>Latest Photos</h3>
                        <span className="link-to-photos">
                            <Link to="photos">See all photos</Link>
                        </span>
                    </div>
                    <ul className="photos-list">
                        { photos.map((photo, index) => (
                            <>
                                <li key={index} className="photos-item">
                                    <img src={photo} className="photos-img" />
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ProfileCarousel;