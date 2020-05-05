

export interface User {
  userID: number;
  userName: string;
  password: string;
  roleID: number;
  statusID: number;
}

export interface UserProfile {
  userID: number;
  userName: string;
  roleName: string;
  statusID: number;
  statusName: string;
  name: string;
  gender: string;
  dob: string;
  address: string;
  phoneNumber: string;
  email: string;
  avatarLink: string;
  bankAccount: string;
}

export interface UserDetail {
  userID: number;
  name: string;
  gender: string;
  dayOfBirth: Date;
  address: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  avatar_link: string;
}

export interface UserLogin {
  u: User;
  ud: UserDetail;
  message: string;
}

export interface UserMail {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}
