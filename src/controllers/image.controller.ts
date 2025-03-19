import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedUrlQuery } from 'node:querystring'
import { MESSAGES } from '~/constants/message'

const imageController = {
  getAll: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.IMAGE.GET_ALL)
  },
  getById: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.IMAGE.GET_BY_ID)
  },
  uploadSingle: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.IMAGE.UPLOAD_IMAGE)
  },
  uploadMultiple: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.created(res, '', MESSAGES.SUCCESS_MESSAGES.IMAGE.UPLOAD_MUL_IMAGE)
  },
  clear: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.IMAGE.CLEAR)
  }
}

export default imageController
