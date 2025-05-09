import userServices from '~/services/users.service'
import { Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'

const userController = {
  register: async (req: Request, res: Response) => {
    const result = await userServices.register(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.REGISTER)
  },
  login: async (req: Request, res: Response) => {
    const result = await userServices.login(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.LOGIN)
  },
  verifyAccount: async (req: Request, res: Response) => {
    const result = await userServices.verifyAccount(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.OTP.VERIFY)
  },
  refreshToken: async (req: Request, res: Response) => {
    const result = await userServices.refreshtoken(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.REFRESH_TOKEN)
  },
  logout: async (req: Request, res: Response) => {
    const result = await userServices.logout(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.LOGOUT)
  },
  resendOTP: async (req: Request, res: Response) => {
    const result = await userServices.sendOTP(req.body.email)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.OTP.RESEND)
  },
  changePwd: async (req: Request, res: Response) => {
    const email = req.user.email
    const result = await userServices.changePassword({ email, ...req.body })
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.CHANGE_PASSWORD)
  },
  forgotPwd: async (req: Request, res: Response) => {
    const result = await userServices.forgotPassword(req.body.email)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.FORGOT_PASSWORD)
  },
  verifyOTPForgotPwd: async (req: Request, res: Response) => {
    const result = await userServices.verifyOTPForgotPwd(req.body.otp)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.VERIFY_FORGOT_PASSWORD)
  },
  resetPwd: async (req: Request, res: Response) => {
    const result = await userServices.resetPwd(req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.RESET_PASSWORD)
  },
  getProfile: async (req: Request, res: Response) => {
    const result = await userServices.getProfile(req.user._id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.GET_BY_ID)
  },
  updateProfile: async (req: Request, res: Response) => {
    const result = await userServices.updateProfile(req.user._id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.UPDATE)
  },
  updateAvatar: async (req: Request, res: Response) => {
    const result = await userServices.uploadAvatar(req.user._id, req.file)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.USER.UPLOAD_AVATAR)
  }
}

export default userController
