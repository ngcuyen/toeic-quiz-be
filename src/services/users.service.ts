import { JsonWebTokenError, SignOptions } from 'jsonwebtoken'
import _ from 'lodash'
import { env } from '~/config/environment.config'
import { TokenType, UserRole, UserVerifyStatus } from '~/constants/enums'
import { AccessTokenDto, RefreshTokenDto } from '~/dtos/Token.dto'
import { ChangePwdDto, CreateUserDto, LoginUserDto, ResetPwdDto, UpdateProfileDto, VerifyOTPDto } from '~/dtos/User.dto'
import { signToken, verifyToken } from '~/utils/jwt'
import bcrypt from 'bcrypt'
import { databaseService } from './connectDB.service'
import User from '~/models/schemas/Users.schema'
import { CreateUserResponse, LoginResponse, ProfileResponse } from '~/@types/response.type'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '~/constants/message'
import otpService from './otp.service'
import { generateEmailContent, generateEmailContentPwd } from '~/utils/email'
import emailService from './email.service'
import { ObjectId } from 'mongodb'
import cloudinary from '~/config/cloudinary.config'
class UserService {
  // Generate accesstoken
  signAccessToken(_id: string, email: string, username: string, role: UserRole): Promise<string> {
    const { access_token_exp, jwt_algorithm, secret_key } = env.jwt
    const payload: AccessTokenDto = {
      _id,
      email,
      username,
      role,
      token_type: TokenType.AccessToken
    }
    const options: SignOptions = {
      expiresIn: access_token_exp,
      algorithm: jwt_algorithm
    }
    return signToken({ payload, privateKey: secret_key as string, options })
  }

  // Generate freshtoken
  signRefreshToken(_id: string, email: string, username: string, role: UserRole): Promise<string> {
    let { refresh_token_exp, jwt_algorithm, refresh_token_key } = env.jwt
    return signToken({
      payload: {
        _id,
        email,
        username,
        role,
        token_type: TokenType.RefreshToken
      },
      privateKey: refresh_token_key as string,
      options: {
        expiresIn: refresh_token_exp,
        algorithm: jwt_algorithm
      }
    })
  }

  // Generate refreshtoken and accesstoken
  signAccessAndRefreshToken(user_id: string, email: string, username: string, role: UserRole): Promise<[string, string]> {
    return Promise.all([this.signAccessToken(user_id, email, username, role), this.signRefreshToken(user_id, email, username, role)])
  }

  //create new account
  async register(user: CreateUserDto): Promise<CreateUserResponse> {
    const { username, email, password, fullname } = user
    try {
      const hashPwd = bcrypt.hashSync(password, env.password.salt_round)
      const user = new User({
        username,
        email,
        password: hashPwd,
        fullname
      })
      const newUser = await databaseService.users.insertOne(user)
      const userId = newUser.insertedId.toString()
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(userId, email, username, UserRole.User)

      await this.sendOTP(email)
      return {
        _id: userId,
        username,
        email,
        access_token,
        refresh_token
      }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.REGISTER
      })
    }
  }

  //send OTP
  async sendOTP(email: string): Promise<void> {
    try {
      const otp = await otpService.generateOTP(email)
      const emailContent = await generateEmailContent(otp.code)
      await emailService.sendMail(otp.email, 'Hutech Bug', emailContent)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.SEND_FAILURE
      })
    }
  }

  async sendOTPForgotPwd(email: string): Promise<void> {
    try {
      const otp = await otpService.generateOTP(email)
      const emailContent = await generateEmailContentPwd(otp.code)
      await emailService.sendMail(otp.email, 'Hutech Bug', emailContent)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.SEND_FAILURE
      })
    }
  }

  //verify account
  async verifyAccount(otpObject: VerifyOTPDto): Promise<void> {
    try {
      const existingOTP = await otpService.findOTP(otpObject.otp)
      const { email } = existingOTP
      await databaseService.users.findOneAndUpdate({ email }, { $set: { verify: UserVerifyStatus.Verified } })
      await databaseService.otps.findOneAndDelete({ email })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.VERIFY_OTP
      })
    }
  }

  //login to an existing account
  async login(payload: LoginUserDto): Promise<LoginResponse> {
    try {
      const { email, password } = payload
      const user = await databaseService.users.findOne({ email })
      if (!user) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.NOT_REGISTER
        })
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL_OR_PASSWORD_IS_INCORRECT
        })
      }
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user._id.toString(), user.email, user.username, user.role)
      const query = { user_id: user._id }
      const update = { $set: { token: refresh_token } }
      const options = { upsert: true }
      await databaseService.refreshTokens.updateOne(query, update, options)
      return {
        _id: user._id.toString(),
        username: user.username,
        email,
        access_token,
        refresh_token
      }
    } catch (error) {
      if (error instanceof ErrorWithStatus && error.statusCode) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.LOGIN
      })
    }
  }

  async refreshtoken(payload: RefreshTokenDto): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const secretKey = env.jwt.refresh_token_key
      const data = await verifyToken({ token: payload.refresh_token, secretOrPublicKey: secretKey })
      const { _id, email, username, role } = data
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(_id, email, username, role)
      return {
        access_token,
        refresh_token
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.IS_NOT_EXIST
        })
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.NOT_FOUND
      })
    }
  }

  async logout(payload: RefreshTokenDto): Promise<void> {
    try {
      const { refresh_token } = payload
      const token = await databaseService.refreshTokens.findOne({ token: refresh_token })
      if (!token) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.VALIDATION_MESSAGES.USER.TOKEN.REFRESH_TOKEN.NOT_FOUND
        })
      }
      await databaseService.refreshTokens.deleteOne(token)
    } catch (error) {
      if (error instanceof ErrorWithStatus && error.statusCode) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.LOGOUT
      })
    }
  }

  async changePassword(payload: ChangePwdDto): Promise<void> {
    try {
      const { email, new_password } = payload
      const hashNewPwd = bcrypt.hashSync(new_password, env.password.salt_round)
      const changePwdUser = await databaseService.users.findOne({ email })
      const query = { _id: changePwdUser._id }
      const update = { $set: { password: hashNewPwd } }
      const options = { upsert: false }
      await databaseService.users.updateOne(query, update, options)
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.CHANGE_FAILED
      })
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.sendOTPForgotPwd(email)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.FORGOT_PASSWORD
      })
    }
  }

  async verifyOTPForgotPwd(otp: string): Promise<void> {
    try {
      const existingOTP = await otpService.findOTP(otp)
      const { email } = existingOTP
      await databaseService.otps.findOneAndDelete({ email })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.VERIFY_FORGOT_PASSWORD_TOKEN
      })
    }
  }

  async resetPwd(payload: ResetPwdDto): Promise<void> {
    try {
      const { email, new_password } = payload
      const hashedPwd = bcrypt.hashSync(new_password, env.password.salt_round)
      const updatedUser = await databaseService.users.findOne({ email })
      if (!updatedUser) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.RESET_FAILED
        })
      }
      const query = { _id: updatedUser._id }
      const update = { $set: { password: hashedPwd } }
      const options = { upsert: false }
      await databaseService.users.updateOne(query, update, options)
      await databaseService.otps.deleteMany({ email })
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.RESET_FAILED
      })
    }
  }

  async getProfile(id: string): Promise<ProfileResponse> {
    try {
      const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
      const filterUser = _.omit(user, 'password', 'password_change_at')
      return filterUser
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.GET_USER_PROFILE
      })
    }
  }

  async updateProfile(id: string, payload: UpdateProfileDto): Promise<ProfileResponse> {
    try {
      if (Object.keys(payload).length === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.FIELD_UPDATE_IS_REQUIRED
        })
      }
      const { username, gender, address } = payload
      const update = {
        username,
        gender,
        address,
        updated_at: new Date()
      }

      await databaseService.users.updateOne({ _id: new ObjectId(id) }, { $set: update }, { upsert: false })

      const user = await databaseService.users.findOne({ _id: new ObjectId(id) })

      const filterUser = _.omit(user, 'password', 'password_change_at')
      return filterUser
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.UPDATE_USER
      })
    }
  }

  async uploadAvatar(id: string, file: Express.Multer.File): Promise<string> {
    try {
      const fileBuffer = file.buffer
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: env.cloudinary.avatar_folder
            },
            (error, result) => {
              if (error) {
                return reject(error)
              }
              resolve(result)
            }
          )
          .end(fileBuffer)
      })
      await databaseService.users.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { avatar: result.secure_url } }, { upsert: false })
      return result.secure_url
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.GENERAL.AVATAR
      })
    }
  }
}

const userServices = new UserService()
export default userServices
