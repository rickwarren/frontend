export class CreatePostDto {
  constructor(data: any) {
    this.authorId = data.authorId;
    this.locationId = data.locationId;
    this.message = data.message;
    this.attachment = data.attachment;
  }

  authorId: string;
  locationId: string;
  message: string;
  attachment: string;
}
