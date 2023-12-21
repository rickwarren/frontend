export class PhotoDto {
    constructor(data: any) {
        this.id = data.id;
        this.userId = data.userId;
        this.localFileId = data.localFileId;
    }

    id: string;
    userId: string;
    localFileId: string;
}