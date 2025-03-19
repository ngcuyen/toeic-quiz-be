import { ObjectId } from 'mongodb'
import { AuthProvider } from '~/@types/auth.type'
import { UserRole, UserVerifyStatus, UserGenderType } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  username: string
  email: string
  password?: string
  role?: UserRole
  gender?: UserGenderType
  verify?: UserVerifyStatus
  address?: string
  avatar?: string
  cover_photo?: string
  isOnline?: Boolean
  _destroy?: Boolean
  providerId?: string
  provider?: AuthProvider
  password_change_at?: Date
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  username: string
  email: string
  password: string
  role: UserRole
  gender: UserGenderType
  verify: UserVerifyStatus
  address: string
  avatar: string
  cover_photo: string
  isOnline: Boolean
  _destroy: Boolean
  providerId: string
  provider: AuthProvider
  password_change_at: Date
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user._id
    this.username = user.username
    this.email = user.email
    this.password = user.password
    this.gender = user.gender || null
    this.role = user.role || UserRole.User
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.address = user.address || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
    this.isOnline = user.isOnline || false
    this._destroy = user._destroy || false
    this.provider = user.provider
    this.providerId = user.providerId
    this.password_change_at = user.password_change_at || null
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || null
  }
}
