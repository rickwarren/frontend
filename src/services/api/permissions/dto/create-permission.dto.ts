import * as protoscript from "protoscript";

export class CreatePermissionDto {
  constructor(data: any) {
    this.userId = data.userId;
    this.permission = data.permission;
  }
  
  userId: string;
  permission: string;
}
