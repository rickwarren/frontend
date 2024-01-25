import { api } from "../../api";
import { CreateVideoDto } from "./dto/create-video.dto";
import { VideoDto } from "./dto/video.dto";

async function getVideos(userId: string): Promise<VideoDto[] | undefined> {
    try {
        const videos = await api.get<any, any>('http://localhost:3000/video/all/' + userId);
        if(videos) {
            return videos.data;
        }
    } catch(e) {    
        console.log(e);
    }
    return;
}

async function getVideo(id: string) {
    try {
        const video = await api.get('http://localhost:3000/video/' + id);
        if(video) {
            return video;
        }
    } catch(e) {    
        console.log(e);
    }
}

async function createVideo(data: CreateVideoDto) {
    try {
        const video = await api.post('http://localhost:3000/video', data);
        if(video) {
            return video;
        }
    } catch(e) {    
        console.log(e);
    }
}

async function deleteVideo(id: string) {
    try {
        const result = await api.delete('http://localhost:3000/video/' + id);
        if(result) {
            return result;
        }
    } catch(e) {    
        console.log(e);
    }
}

export {
    getVideos,
    getVideo,
    createVideo,
    deleteVideo,
}