export class FriendListDto {
  constructor(data: any) {
    this.id = data.id;
    this.requesterId = data.requesterId;
    this.addresseId = data.addresseId;
    this.friendType = data.friendType;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
  
  id: string;
  requesterId: string;
  addresseId: string;
  friendType: string;
  createdAt: string;
  updatedAt: string;
}
