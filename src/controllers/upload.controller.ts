import { Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import uploadService from '~/services/upload.service'

const uploadController = {
  upload: async (req: Request, res: Response) => {
    const result = await uploadService.upload(req.file)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.IMAGE.UPLOAD_IMAGE)
  }
}

export default uploadController
