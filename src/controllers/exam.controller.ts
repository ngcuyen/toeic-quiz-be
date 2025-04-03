import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { MESSAGES } from '~/constants/message'
import { ExamDto } from '~/dtos/Exam.dto'
import examService from '~/services/exam.service'

const examController = {
  create: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const userId = req.user?._id
    const payload = { ...req.body, user_id: userId }
    console.log('🚀 ~ create: ~ payload:', payload)
    const result = await examService.create(payload)
    return sendResponse.created(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM.CREATE)
  },
  getOne: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await examService.getOne(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM.GET_BY_ID)
  },
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const { page, limit } = req.query
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const result = await examService.getAll(pageNumber, limitNumber)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM.GET_ALL)
  },
  update: async (req: Request<ParamsDictionary, any, ExamDto>, res: Response) => {
    const result = await examService.update(req.params.id, req.body)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM.UPDATE)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response) => {
    const result = await examService.delete(req.params.id)
    return sendResponse.success(res, result, MESSAGES.SUCCESS_MESSAGES.EXAM.DELETE)
  }
}

export default examController
