import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGES } from '~/constants/message'
import authServices from '~/services/auth.service'

const authController = {
  get: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.GET_BY_ID)
  },

  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await authServices.getAllUser(req.query)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.AUTH.GET_ALL)
  },

  update: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.UPDATE)
  },

  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.DELETE)
  },

  getRoleList: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.GET_ROLES)
  },

  updateRole: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.UPDATE_ROLE)
  },

  deleteRole: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.DELETE_ROLE)
  },

  restPasswordByAdmin: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', MESSAGES.SUCCESS_MESSAGES.AUTH.RESET_PASSWORD)
  }
}

export default authController
