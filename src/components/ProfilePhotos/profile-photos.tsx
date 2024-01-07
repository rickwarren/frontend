import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useSession } from "../../hooks/useSession";
import { createPhoto, getPhotos } from "../../services/api/photo";
import { createLocalFile, getLocalFile } from "../../services/api/local-file";
import { Button, Upload, UploadProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './profile-photos.scss';
import { getImageSize } from "react-image-size";
import { useLocation } from "react-router-dom";
import { getUserBySlug } from "../../services/api/user";
import React from "react";

async function fetchImageSize(url: string) {
    try {
        const dimensions = await getImageSize(url);
        return dimensions;
    } catch (error) {
        console.error(error);
    }
}

function ProfilePhotos() {
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const { user } = useSession();
    const patharr = path.split('/');
    const [photos, setPhotos] = useState<any[]>([]);
    const [image, setImage] = useState<any>();
    const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

    const uploadProps: UploadProps = {
        name: 'file',
        action: 'http://localhost:3000/upload/dummy',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info: any) {
            if(info) {
                setImage(info.file.originFileObj);
            }
        },
      };

      function storePhoto() {
        createLocalFile(image).then((response) => {
            if(response) {
                if(user) {
                    const photo = {
                        userId: u.id,
                        localFileId: response.id,
                    }
                    createPhoto(photo).then((p) => {
                        retrievePhotos(u);
                    });
                }
            }
        });
      }
    
    async function retrievePhotos(usr: any) {
        if(usr) {
            const photoList = await getPhotos(usr.id);
            if(photoList) {
                const fileList = await Promise.all(photoList.map(async (photo) => {
                    const dimensions = await fetchImageSize('http://localhost:3000/upload/' + photo.localFileId);
                    return { 
                        src: 'http://localhost:3000/upload/' + photo.localFileId,
                        width: dimensions?.width,
                        height: dimensions?.height,
                    }; 
                }));
                const photosList = fileList.map((photo) => {
                    const width = breakpoints[0];
                    if(photo.width && photo.height) {
                        const height = (photo.height / photo.width) * width;
                        return {
                            src: photo.src,
                            width,
                            height,
                            srcSet: breakpoints.map((breakpoint) => {
                                if(photo.width && photo.height) {
                                    const height = Math.round((photo.height / photo.width) * breakpoint);
                                    return {
                                        src: photo.src,
                                        width: breakpoint,
                                        height,
                                    };
                                }
                            }),
                        };
                    }
                });
                setPhotos(photosList);
            }
        }
    }

    useEffect(() => {
        if(patharr[1] == 'profile') {
            getUserBySlug(patharr[2]).then((usr) => {
                setU(usr);
                retrievePhotos(usr);
            });
        } else {
            setU(user);
            retrievePhotos(user);
        }
    }, []);

    useEffect(() => {
        storePhoto();
        retrievePhotos(u);
    }, [image])

  const [index, setIndex] = useState(-1);

  return (
    <>
        <div className="col-lg-12 gedf-main">
            <div className="profile-photos">
                <div className="card social-timeline-card newpost">
                    <div className="card-body">
                        <div className="add-photos-wrapper">
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>Add Photos</Button>
                            </Upload>
                        </div>
                        { photos.length < 1 ? <p>No photos</p> : (
                            <>
                                <h1>Photos</h1>
                                <PhotoAlbum photos={photos} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

                                <Lightbox
                                    slides={photos}
                                    open={index >= 0}
                                    index={index}
                                    close={() => setIndex(-1)}
                                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProfilePhotos;