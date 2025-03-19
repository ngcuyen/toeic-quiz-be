import { ObjectId } from 'mongodb'
import { StatusType } from '~/constants/enums'

export interface CreateUserResponse {
  _id: string
  username: string
  email: string
  access_token: string
  refresh_token: string
}

export interface LoginResponse {
  _id: string
  username: string
  email: string
  access_token: string
  refresh_token: string
}

export interface ProfileResponse {
  _id?: ObjectId
  username: string
  email: string
  role?: string
  gender?: string
  address?: string
  avatar?: string
  cover_photo?: string
  isOnline?: Boolean
  password_change_at?: Date
  created_at?: Date
  updated_at?: Date
}

/** BUG RESPONSE */
export interface GetBugResponse {
  _id: ObjectId
  title: string
  description: string
  image: string
  // user_id: ObjectId
  status: StatusType
  created_at: Date
  updated_at: Date
}

/** SOLUTION RESPONSE */
export interface GetSolutionResponse {
  _id: ObjectId
  description: string
  image: string
  // user_id: ObjectId
  status: StatusType
  bug_id: ObjectId
  created_at: Date
  updated_at: Date
}

/** COMMENT RESPONSE */
export interface GetCommentResponse {
  _id: ObjectId
  user_id?: ObjectId
  solution_id: ObjectId
  content: string
  parent_id?: number
  left_value: number
  right_value: number
  created_at: Date
  updated_at: Date
}
