import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { QuizSessionDto } from '~/dtos/QuizSession.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import QuizSession from '~/models/schemas/QuizSessions.schema'
import { databaseService } from '~/services/connectDB.service'

class QuizSessionService {
  async checkExamExist(exam_id: string): Promise<boolean> {
    const exam = await databaseService.exams.findOne({ _id: new ObjectId(exam_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    return !!exam
  }

  //create a Blank
  async create(payload: QuizSessionDto): Promise<QuizSession | null> {
    const { exam_id } = payload
    await this.checkExamExist(exam_id.toString())

    const quizSessionData = new QuizSession({
      ...payload,
      start_time: new Date(Date.now())
    })
    const { insertedId } = await databaseService.quizSessions.insertOne(quizSessionData)
    const newQuizSession = await databaseService.quizSessions.findOne({ _id: insertedId })
    return newQuizSession
  }
  //get all quizSessions
  async getAll(page: number, limit: number): Promise<PaginationType<QuizSession> | null> {
    const quizSessions = await databaseService.quizSessions
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.quizSessions.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: quizSessions,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a session by id
  async getOne(_id: string): Promise<QuizSession | null> {
    const quizSession = await databaseService.quizSessions.findOne({ _id: new ObjectId(_id) })
    if (!quizSession) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.SESSION.NOT_FOUND
      })
    }
    return quizSession
  }

  //submit test
  async submitTest(_id: string): Promise<QuizSession | null> {
    const session = await databaseService.quizSessions.findOne({ _id: new ObjectId(_id) })
    if (!session) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.SESSION.NOT_FOUND
      })
    }
    const updatedSession = await databaseService.quizSessions.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { end_time: new Date(Date.now()).toISOString() } }, { returnDocument: 'after' })

    return updatedSession
  }
}

const quizSessionService = new QuizSessionService()
export default quizSessionService
