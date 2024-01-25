import { PostDto } from "../../post/dto/post.dto";
import { UserDto } from "../../user/dto/user.dto";

export class SearchResultsDto {
    constructor(data: any) {
        this.posts = data.posts;
        this.profiles = data.profiles;
        this.charities = data.charities;
        this.corporations = data.corporations;
    }
    posts: PostDto[];
    profiles: UserDto[];
    charities: any[];
    corporations: any[];
}