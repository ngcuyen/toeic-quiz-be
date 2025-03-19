import { StatusCodes } from 'http-status-codes'
import { GenerateOTPResult } from '~/@types/auth.type'
import { MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import OTP from '~/models/schemas/Otps.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateOTPCode, hashOTP } from '~/utils/crypto'

class OTPService {
  async findOTP(otp: string): Promise<OTP | null> {
    try {
      const hashedOTP = hashOTP(otp)
      return await databaseService.otps.findOne<OTP>({ otp: hashedOTP })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || MESSAGES.ERROR_MESSAGES.GENERAL.FIND_OTP
      })
    }
  }

  async generateOTP(email: string): Promise<GenerateOTPResult> {
    try {
      const otpCode = generateOTPCode()
      let OTP_LIFETIME = 5 * 60 * 1000
      const otp = new OTP({
        email,
        otp: hashOTP(otpCode),
        expiredIn: new Date(Date.now() + OTP_LIFETIME) // Expires in 5 minutes
      })

      await databaseService.otps.deleteMany({ email: email })
      await databaseService.otps.insertOne(otp)
      return { code: otpCode, email }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || MESSAGES.ERROR_MESSAGES.GENERAL.GENERATED_OTP
      })
    }
  }
}

const otpService = new OTPService()

export default otpService
