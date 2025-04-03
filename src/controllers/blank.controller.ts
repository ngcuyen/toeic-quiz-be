import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import { BlankDto } from '~/dtos/Blank.dto'
import blankService from '~/services/blank.service'
const blankController = {
  create: async (req: Request<ParamsDictionary, any, BlankDto>, res: Response) => {
    const result = await blankService.create(req.body)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.PARAGRAPH.CREATE)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await blankService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.PARAGRAPH.GET_BY_ID)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await blankService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.PARAGRAPH.GET_ALL)
  },
  update: async (req: Request<ParamsDictionary, any, BlankDto>, res: Response) => {
    const result = await blankService.update(req.params.id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.PARAGRAPH.UPDATE)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await blankService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.PARAGRAPH.DELETE)
  }
}

export default blankController
