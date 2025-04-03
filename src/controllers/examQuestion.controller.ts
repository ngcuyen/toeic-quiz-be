import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import { ExamQuestionDto } from '~/dtos/ExamQuestion.dto'
import examQuestionService from '~/services/examQuestion.service'

const examQuestionController = {
  create: async (req: Request<ParamsDictionary, any, ExamQuestionDto>, res: Response) => {
    const result = await examQuestionService.create(req.body)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM_QUESTION.CREATE)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await examQuestionService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM_QUESTION.GET_BY_ID)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await examQuestionService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM_QUESTION.GET_ALL)
  },
  update: async (req: Request<ParamsDictionary, any, ExamQuestionDto>, res: Response) => {
    const result = await examQuestionService.update(req.params.id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM_QUESTION.UPDATE)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await examQuestionService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM_QUESTION.DELETE)
  }
}

export default examQuestionController
