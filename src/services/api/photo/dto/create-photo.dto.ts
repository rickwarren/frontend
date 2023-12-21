export class CreatePhotoDto {
    constructor(data: any) {
        this.userId = data.userId;
        this.localFileId = data.localFileId;
    }

    userId: string;
    localFileId: string;
}