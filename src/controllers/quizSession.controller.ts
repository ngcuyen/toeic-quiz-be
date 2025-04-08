import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import quizSessionService from '~/services/quizSession.service'
import { QuizSessionDto } from '~/dtos/QuizSession.dto'
import { ObjectId } from 'mongodb'

const quizSessionController = {
  create: async (req: Request<ParamsDictionary, any, QuizSessionDto>, res: Response) => {
    const userId = req.user?._id
    const payload = { ...req.body, user_id: new ObjectId(userId) }
    const result = await quizSessionService.create(payload)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.SESSION.CREATE)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await quizSessionService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.SESSION.GET_ALL)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await quizSessionService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.SESSION.GET_BY_ID)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await quizSessionService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.SESSION.DELETE)
  },
  submitTest: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { score } = req.body
    const result = await quizSessionService.submitTest(req.params.id, score)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.SESSION.SUBMIT_TEST)
  }
}

export default quizSessionController
