import { PostDto } from "../../post/dto/post.dto";
import { UserDto } from "../../user/dto/user.dto";

export class SearchResultsDto {
    constructor(data: any) {
        this.posts = data.posts;
        this.users = data.users;
        this.charities = data.charities;
        this.corporations = data.corporations;
    }
    posts: PostDto[];
    users: UserDto[];
    charities: CharityDto[];
    corporations: CorporationDto[];
}