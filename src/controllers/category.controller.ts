import e, { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import { CategoryDto } from '~/dtos/Category.dto'
import categoryService from '~/services/category.service'
const categoryController = {
  create: async (req: Request<ParamsDictionary, any, CategoryDto>, res: Response) => {
    const result = await categoryService.create(req.body)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.CATEGORY.CREATE)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await categoryService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.CATEGORY.GET_BY_ID)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await categoryService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.CATEGORY.GET_ALL)
  },
  update: async (req: Request<ParamsDictionary, any, CategoryDto>, res: Response) => {
    const result = await categoryService.update(req.params.id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.CATEGORY.UPDATE)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await categoryService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.CATEGORY.DELETE)
  }
}

export default categoryController
