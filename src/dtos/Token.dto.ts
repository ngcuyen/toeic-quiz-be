import { TokenType, UserRole } from '~/constants/enums'

export interface AccessTokenDto {
  _id: string
  email: string
  username: string
  role: UserRole
  token_type: TokenType.AccessToken
}

export interface RefreshTokenDto {
  refresh_token: string
}
