import * as protoscript from "protoscript";

export class UpdateUserDto {
  constructor(
    data: any;
  ) {
    this.id = data.id;
    this.email = data.email;
    this.role = data.role;
    this.permissions = data.permissions;
    this.profile = data.profile;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  id: string;
  email: string;
  role: string;
  permissions: string[];
  profile?: any;
  createdAt?: string;
  updatedAt?: string;
}
