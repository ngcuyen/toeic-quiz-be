import { UserRole } from '~/constants/enums'

export type QueryType = {
  page?: string
  limit?: string
}

export type GenerateOTPResult = {
  code: string
  email: string
}

export type AuthUser = {
  _id: string
  role: UserRole
  email: string
  username: string
}

export const authProviders = ['github', 'facebook', 'google', 'linkedin'] as const

export type AuthProvider = (typeof authProviders)[number]
