export class NotificationDto {
    constructor(data: any) {
      this.id = data.id;
      this.userId = data.userId;
      this.initiatorId = data.initiatorId;
      this.notificationType = data.notificationType;
      this.label = data.label;
      this.status = data.status
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  
    id: string;
    userId: string;
    initiatorId: string;
    notificationType: string;
    label: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  