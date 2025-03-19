import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import upload from '~/config/multer.config'
import { MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'

export const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(
          new ErrorWithStatus({
            statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
            message: MESSAGES.ERROR_MESSAGES.UPLOAD.TOO_LARGE
          })
        )
      }
      return next(
        new ErrorWithStatus({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: MESSAGES.ERROR_MESSAGES.UPLOAD.IMAGE
        })
      )
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(
        new ErrorWithStatus({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: MESSAGES.ERROR_MESSAGES.UPLOAD.BUG
        })
      )
    }
    // Everything went fine.
    next()
  })
}
