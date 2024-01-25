import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { searchFriendsOfFriendsQuery, searchFriendsQuery } from '../../services/api/search/searchApi';
import { getCurrentUser } from '../../services/api/user';
import ReactPlayer from 'react-player';
import { getVideos } from '../../services/api/video/videoApi';


export const VideosFriendsOfFriends = () => {
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [videos, setVideos] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser();
            let res = await searchFriendsOfFriendsQuery(patharr[1], result?.id);
            res = await Promise.all(res);
            let vidList: string[] = [];
            await res.map(async (usr: any) => {
                const vids = await getVideos(usr.id);
                await vids?.map((vid: any) => {
                    vidList.push("http://localhost:3000/upload/" + vid.localFileId)
                })
            })
            setVideos(vidList);
        }
        fetchData();
    }, [path])

    return videos && videos.length > 0 ? (
        <div className="videos-friends-wrapper">
            <ul className="videos-list">
                {videos.map((url: string, index: number) => {
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
        </div>
    ) : (
        <div>No results found</div>
    )
}