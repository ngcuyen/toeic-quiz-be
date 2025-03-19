declare namespace Express {
  enum UserRole {
    Admin = 'Admin',
    User = 'User'
  }

  export interface Request {
    user?: {
      _id: string
      role: UserRole
      email: string
      username: string
    }
  }
}
