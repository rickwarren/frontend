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
import { createLocalVideoFile } from "../../services/api/local-file";
import { Button, Upload, UploadProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './profile-videos.scss';
import { useLocation } from "react-router-dom";
import { getUserBySlug } from "../../services/api/user";
import React from "react";
import { createVideo, getVideos } from "../../services/api/video/videoApi";
import ReactPlayer from "react-player";

function ProfileVideos() {
    const [u, setU] = useState<any>();
    const location = useLocation();
    const path = location.pathname;
    const { user } = useSession();
    const patharr = path.split('/');
    const [videos, setVideos] = useState<any[]>([]);
    const [video, setVideo] = useState<any>();

    const uploadProps: UploadProps = {
        name: 'file',
        action: 'http://localhost:3000/upload/dummy',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info: any) {
            if(info) {
                setVideo(info.file.originFileObj);
            }
        },
      };

      async function storeVideo() {
        const response = await createLocalVideoFile(video);
        const vid = {
            userId: u.id,
            localFileId: response.id,
        }
        await createVideo(vid)
        await retrieveVideos(u);
      }
    
async function retrieveVideos(usr: any) {
    if (usr) {
      const videoList = await getVideos(usr.id);
      if (videoList) {
        const fileList = await Promise.all(
            videoList.map(async (video: any) => {
            return {
              src: "http://localhost:3000/upload/" + video.localFileId,
            };
          })
        );
        const videosList = fileList.map((video) => {
            return video.src
        });
        setVideos(videosList);
      }
    }
  }


    useEffect(() => {
        const fetchData = async () => {
            if(patharr[1] == 'profile') {
                const usr = await getUserBySlug(patharr[2])
                setU(usr);
                await retrieveVideos(usr);
            } else {
                setU(user);
                await retrieveVideos(user);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => { 
            await storeVideo();
            await retrieveVideos(u);
        }
        fetchData();
    }, [video])

  const [index, setIndex] = useState(-1);

  return (
    <>
        <div className="col-lg-12 gedf-main">
            <div className="profile-photos">
                <div className="card social-timeline-card newpost">
                    <div className="card-body">
                        <div className="add-photos-wrapper">
                            <Upload {...uploadProps}>
                                <Button icon={<UploadOutlined />}>Add Videos</Button>
                            </Upload>
                        </div>
                        { videos.length < 1 ? <p>No Videos</p> : (
                            <>
                                <h1>Videos</h1>
                                <ul className="videos-list">
                                    {videos.map((url, index) => {
                                        return (
                                            <li key={index} className="video-list-item">
                                                <ReactPlayer
                                                    url={url}
                                                    controls={true}
                                                    width="200px"
                                                    height="120px"
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProfileVideos;