import { Router } from 'express'
import upload from '~/config/multer.config'
import userController from '~/controllers/users.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middleware'
import {
  ChangePwdValidator,
  forgotPwdValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resendOTPValidator,
  resetPwdValidator,
  updateProfileValidator,
  verifyValidator
} from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

/**
 * Description: Login a user with email and password
 * Purpose: Authenticates the user and returns a token.
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapRequestHandler(userController.login))

/**
 * Description. Register a new user
 * Purpose: Create a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, phone: string }
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(userController.register))

/**
 * Description. Logout a user
 * Purpose: Logs the user out and invalidates the token
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', wrapRequestHandler(requireLoginMiddleware), refreshTokenValidator, wrapRequestHandler(userController.logout))

/**
 * Description. Refresh Token
 * Purpose: Refreshes an expired token.
 * Path: /token/refresh
 * Method: POST
 * Body: { refresh_token: string }
 */
userRouter.post('/token/refresh', refreshTokenValidator, wrapRequestHandler(userController.refreshToken))

/**
 * Description. Verify otp when user client
 * Purpose: Authenticates the user using OTP
 * Path: /otp/authenticate
 * Method: POST
 * Body: { otp: string }
 */
userRouter.post('/otp/authenticate', verifyValidator, wrapRequestHandler(userController.verifyAccount))

/**
 * Description. Verify otp when user client click on the button resend otp
 * Purpose:  Resends or revalidates the OTP for the user.
 * Path: /otp/revalidate
 * Method: POST
 * Body: { email: string }
 */
userRouter.post('/otp/revalidate', resendOTPValidator, wrapRequestHandler(userController.resendOTP))

/**
 * Description. Submit email to forgot password, send email to user
 * Purpose: Initiates the process to reset the forgotten password.
 * Path: /password/forgot
 * Method: POST
 * Body: { email: string }
 */
userRouter.post('/password/forgot', forgotPwdValidator, wrapRequestHandler(userController.forgotPwd))

/**
 * Description. Verify OTP in email to forgot password
 * Purpose:  Authenticates the user's request to reset the forgotten password.
 * Path: /password/forgot/authenticate
 * Method: POST
 * Body: { forgot_password_token: string }
 */
userRouter.post('/password/forgot/authenticate', verifyValidator, wrapRequestHandler(userController.verifyOTPForgotPwd))

/**
 * Description: Reset password
 * Purpose: Resets the user's password.
 * Path: /password/reset
 * Method: POST
 * Body: { email: string, password: string, confirm_password: string }
 */
userRouter.post('/password/reset', resetPwdValidator, wrapRequestHandler(userController.resetPwd))

/**
 * Description: Change password
 * Purpose: Allows the user to change their password.
 * Path: /password/change
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, password: string, confirm_password: string }
 */
userRouter.post('/password/change', wrapRequestHandler(requireLoginMiddleware), ChangePwdValidator, wrapRequestHandler(userController.changePwd))

/**
 * Description: Get my profile
 * Purpose: Retrieves the personal information of the authenticated user.
 * Path: /@me/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/@me/profile', wrapRequestHandler(requireLoginMiddleware), wrapRequestHandler(userController.getProfile))

/**
 * Description: Update self profile
 * Purpose: Updates the personal information of the authenticated user.
 * Path: /@me/profile
 * Method: PUT
 * Body: {}
 * Header: { Authorization: Bearer <access_token> }
 */
userRouter.put('/@me/profile', wrapRequestHandler(requireLoginMiddleware), updateProfileValidator, wrapRequestHandler(userController.updateProfile))

/**
 * Description: Upload avatar
 * Purpose: Changes the avatar for the authenticated user.
 * Path: /@me/avatar
 * Method: POST
 * Body:
 */
userRouter.post('/@me/avatar', wrapRequestHandler(requireLoginMiddleware), upload.single('avatar'), wrapRequestHandler(userController.updateAvatar))

/**
 * Description: Test token
 * Purpose: Checks the validity of the current token.
 * Path: /test-token
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */
userRouter.post('/token/check')

export default userRouter
