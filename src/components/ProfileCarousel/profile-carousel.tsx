import { useSession } from '@/hooks';
import { getPhotos } from '@/services/api/photo';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileCarousel: React.FC = (props: any) => {
    const { user } = useSession();
    const [photos, setPhotos] = useState<string[]>([]);

    const retrievePhotos = async () => {
        if(user) {
            const photoList = await getPhotos(user.id);
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
    }

    useEffect(() => {
        retrievePhotos();
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
                        { photos.map((photo) => (
                            <>
                                <li className="photos-item">
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