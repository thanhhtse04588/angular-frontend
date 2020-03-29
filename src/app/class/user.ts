

export class User {
    userID: number
    userName: string
    password: string
    roleID: number
    statusID: number
}

export class UserDetail {
    userID: number
    name: string
    gender: string
    dayOfBirth: Date
    address: string
    phoneNumber: string
    email: string
    bankAccount: string
    avatar_link: string
  }

export class UserLogin {
    u: User
    ud: UserDetail
    message: string
  }