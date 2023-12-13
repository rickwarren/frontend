import * as protoscript from "protoscript";

export class PermissionsDto {
  constructor(data: any) {
    this.id = data.id;
    this.userId = data.userId;
    this.permission = data.permission;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: string;
  userId: string;
  permission: string;
  createdAt: protoscript.Timestamp;
  updatedAt: protoscript.Timestamp;
}
