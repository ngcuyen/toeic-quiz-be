import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import questionService from '~/services/question.service'
import { QuestionDto } from '~/dtos/Question.dto'
import { update } from 'lodash'

const questionController = {
  create: async (req: Request<ParamsDictionary, any, QuestionDto>, res: Response) => {
    const result = await questionService.create(req.body)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.QUESTION.CREATE)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await questionService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.QUESTION.GET_ALL)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await questionService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.QUESTION.GET_BY_ID)
  },
  update: async (req: Request<ParamsDictionary, any, QuestionDto>, res: Response) => {
    const result = await questionService.update(req.params.id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.QUESTION.UPDATE)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await questionService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.QUESTION.DELETE)
  }
}

export default questionController
