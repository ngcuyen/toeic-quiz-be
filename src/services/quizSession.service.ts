import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { BlankDto } from '~/dtos/Blank.dto'
import { QuizSessionDto } from '~/dtos/QuizSession.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Blank from '~/models/schemas/Blanks.schema'
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
  //get all blanks
  async getAll(page: number, limit: number): Promise<PaginationType<Blank> | null> {
    const blanks = await databaseService.blanks
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.blanks.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: blanks,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a session by id
  async getOne(_id: string): Promise<Blank | null> {
    const blank = await databaseService.blanks.findOne({ _id: new ObjectId(_id) })
    if (!blank) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.BLANK.NOT_FOUND
      })
    }
    return blank
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
    const updatedBlank = await databaseService.quizSessions.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { end_time: new Date(Date.now()).toISOString() } }, { returnDocument: 'after' })
    console.log('🚀 ~ QuizSessionService ~ submitTest ~ updatedBlank:', updatedBlank)
    return updatedBlank
  }
}

const quizSessionService = new QuizSessionService()
export default quizSessionService
