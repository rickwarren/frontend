export class Message {
    constructor(data: any) {
        this.id = data.id;
        this.userId1 = data.userId1;
        this.userId2 = data.userId2;
        this.message = data.message;
        this.attachment = data.attachemnt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    
    id: string;
    userId1: string;
    userId2: string;
    message: string;
    attachment: string;
    createdAt: string;
    updatedAt: string;
}