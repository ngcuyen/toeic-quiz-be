import { UserGenderType } from '~/constants/enums'

export interface CreateUserDto {
  username: string
  email: string
  fullname: string
  password: string
  confirm_password: string
}

export interface LoginUserDto {
  email: string
  password: string
}

export interface LogoutUserDto {
  refresh_token: string
}

export interface VerifyOTPDto {
  otp: string
}

export interface ChangePwdDto {
  email: string
  old_password: string
  new_password: string
  confirm_new_password: string
}

export interface ResetPwdDto {
  email: string
  new_password: string
  confirm_new_password: string
}

export interface UpdateProfileDto {
  username: string
  gender: UserGenderType
  address: string
}
