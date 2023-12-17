export class CreateFriendListDto {
  constructor(data: any) {
    this.requesterId = data.requesterId;
    this.addresseId = data.addresseId;
    this.friendType = data.friendType;
  }
  
  requesterId: string;
  addresseId: string;
  friendType: string;
}
