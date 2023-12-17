export class UpdateCommentDto {
  constructor(data: any) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.message = data.message;
    this.attachment = data.attachment;
    this.postId = data.postId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: string;
  authorId: string;
  message: string;
  attachment: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}
