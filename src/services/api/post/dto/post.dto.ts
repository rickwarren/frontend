import { CommentDto } from '../../comment/dto/comment.dto';
import { UserDto } from '../../user/dto/user.dto';

export class PostDto {
  constructor(data: any) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.locationId = data.locationId;
    this.message = data.message;
    this.attachment = data.attachment;
    this.comments = data.comments;
    this.author = data?.author;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: string;
  authorId: string;
  locationId: string;
  message: string;
  attachment: string;
  comments: CommentDto[];
  author?: UserDto;
  createdAt: string;
  updatedAt: string;
}
