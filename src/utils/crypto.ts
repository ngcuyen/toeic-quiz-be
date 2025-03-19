import { createHash, randomBytes, randomInt } from 'crypto'
import { env } from '~/config/environment.config'

export const sha256 = (content: string) => createHash('sha256').update(content).digest('hex')

export const generatePassword = () => randomBytes(8).toString('hex')

export const hashPassword = (password: string) => sha256(password + env.server.password_secret)

export const generateOTPCode = () => randomInt(100000, 999999).toString()

export const generateIdComment = () => randomInt(10000000, 99999999).toString()

export const hashOTP = (otp: string) => sha256(otp + env.server.otp_secret)
