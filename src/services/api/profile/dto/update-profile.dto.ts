export class UpdateProfileDto {
  constructor(
    data: any
  ) {
    this.id = data.id;
    this.ownerId = data.ownerId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.profession = data.profession;
    this.employer = data.employer;
    this.dateHired = data.dateHired;
    this.employmentStatus = data.employmentStatus;
    this.relationshipStatus = data.relationshipStatus;
    this.profilePhoto = data.profilePhoto;
    this.bannerImage = data.bannerImage;
    this.hometown = data.hometown;
    this.city = data.city;
    this.province = data.province;
    this.country = data.country;
    this.language = data.language;
    this.mobilePhone = data.mobilePhone;
    this.visibility = data.visibility;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
  
  id: string;
  ownerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profession: string;
  employer: string;
  dateHired: string;
  employmentStatus: string;
  relationshipStatus: string;
  profilePhoto: string;
  bannerImage: string;
  hometown: string;
  city: string;
  province: string;
  country: string;
  language: string;
  mobilePhone: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
}
