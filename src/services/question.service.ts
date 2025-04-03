import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { QuestionDto } from '~/dtos/Question.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Question from '~/models/schemas/Questions.schema'
import { databaseService } from '~/services/connectDB.service'

class QuestionService {
  //create a new homestay
  async create(payload: QuestionDto): Promise<Question> {
    const { paragraph_id, category_id } = payload
    const questionData = new Question({
      ...payload,
      created_at: new Date(Date.now())
    })
    const { insertedId } = await databaseService.questions.insertOne(questionData)
    const newQuestion = await databaseService.questions.findOne({ _id: insertedId })
    return newQuestion
  }
  async getAll(page: number, limit: number): Promise<PaginationType<Question> | null> {
    const questions = await databaseService.questions
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.questions.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: questions,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a question by id
  async getOne(_id: string): Promise<Question | null> {
    const question = await databaseService.questions.findOne({ _id: new ObjectId(_id) })
    if (!question) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.QUESTION.NOT_FOUND
      })
    }
    return question
  }

  //update a homestay
  async update(_id: string, payload: QuestionDto): Promise<Question | null> {
    const question = await databaseService.questions.findOne({ _id: new ObjectId(_id) })
    if (!question) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.QUESTION.NOT_FOUND
      })
    }
    await databaseService.questions.updateOne({ _id: new ObjectId(_id) }, { $set: payload })
    const updatedQuestion = await databaseService.questions.findOne({ _id: new ObjectId(_id) })
    return updatedQuestion
  }

  //delete a homestay
  async delete(_id: string): Promise<any> {
    const question = await databaseService.questions.findOne({ _id: new ObjectId(_id) })
    if (!question) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.QUESTION.NOT_FOUND
      })
    }
    await databaseService.questions.deleteOne({ _id: new ObjectId(_id) })
  }
}

const questionService = new QuestionService()
export default questionService
