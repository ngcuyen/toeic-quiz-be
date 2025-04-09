import cloudinary from '~/config/cloudinary.config'
import { env } from '~/config/environment.config'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '~/constants/message'
import { MulterError } from 'multer'

class UploadService {
  async upload(file: Express.Multer.File): Promise<string> {
    try {
      const fileBuffer = file.buffer
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: env.cloudinary.bugs_folder
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
      return result.secure_url
    } catch (error) {
      if (error instanceof MulterError) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
          message: MESSAGES.ERROR_MESSAGES.UPLOAD.TOO_LARGE
        })
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.UPLOAD.BUG
      })
    }
  }
}
const uploadService = new UploadService()
export default uploadService
