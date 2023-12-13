import * as protoscript from 'protoscript';

export class FriendRequestDto {
  constructor(data: any) {
    this.id = data.id;
    this.requesterId = data.requesterId;
    this.addresseId = data.addresseId;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
  
  id: string;
  requesterId: string;
  addresseId: string;
  status: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
