import { Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import uploadService from '~/services/upload.service'

const uploadController = {
  bugs: async (req: Request, res: Response) => {
    const result = await uploadService.uploadBug(req.file)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.IMAGE.UPLOAD_IMAGE)
  },
  solutions: async (req: Request, res: Response) => {
    const result = await uploadService.uploadSolution(req.file)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.IMAGE.UPLOAD_IMAGE)
  }
}

export default uploadController
