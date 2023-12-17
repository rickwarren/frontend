export class CreateCommentDto {
  constructor(data: any) {
    this.authorId = data.authorId;
    this.message = data.message;
    this.attachment = data.attachment;
    this.postId = data.postId;
  }

  authorId: string;
  message: string;
  attachment: string;
  postId: string;
}
