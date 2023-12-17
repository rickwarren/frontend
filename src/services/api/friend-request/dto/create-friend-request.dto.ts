export class CreateFriendRequestDto {
  constructor(data: any) {
    this.requesterId = data.requesterId;
    this.addresseId = data.addresseId;
    this.status = data.status;
  }
  
  requesterId: string;
  addresseId: string;
  status: string;
}
