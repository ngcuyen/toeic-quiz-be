import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { ExamQuestionDto } from '~/dtos/ExamQuestion.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import ExamQuestion from '~/models/schemas/ExamQuestions.schema'
import { databaseService } from '~/services/connectDB.service'

class ExamQuestionService {
  async checkExistingId(_id: string, collection: string, keyMessage: string) {
    const existingId = await databaseService[collection].findOne({ _id: new ObjectId(_id) })
    if (!existingId) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES[keyMessage].NOT_FOUND
      })
    }
  }

  //create a exam questions
  async create(payload: ExamQuestionDto): Promise<ExamQuestion | null> {
    const { question_id, exam_id } = payload
    await this.checkExistingId(question_id.toString(), 'questions', 'QUESTION')
    await this.checkExistingId(exam_id.toString(), 'exams', 'EXAM')
    const examQuestionData = new ExamQuestion(payload)
    const { insertedId } = await databaseService.examQuestions.insertOne(examQuestionData)
    const newExamQuestion = await databaseService.examQuestions.findOne({ _id: insertedId })
    return newExamQuestion
  }
  //get all exam questions
  async getAll(page: number, limit: number): Promise<PaginationType<ExamQuestion> | null> {
    const examQuestions = await databaseService.examQuestions
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.examQuestions.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: examQuestions,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a exam by id
  async getOne(_id: string): Promise<ExamQuestion | null> {
    const examQuestion = await databaseService.examQuestions.findOne({ _id: new ObjectId(_id) })
    if (!examQuestion) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    return examQuestion
  }

  //update a exam
  async update(_id: string, payload: ExamQuestionDto): Promise<ExamQuestion | null> {
    const exam = await databaseService.examQuestions.findOne({ _id: new ObjectId(_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    await databaseService.examQuestions.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...payload,
          updated_at: new Date(Date.now())
        }
      }
    )
    const updatedExam = await databaseService.examQuestions.findOne({ _id: new ObjectId(_id) })
    return updatedExam
  }

  //delete a exam
  async delete(_id: string): Promise<any> {
    const exam = await databaseService.examQuestions.findOne({ _id: new ObjectId(_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    await databaseService.examQuestions.deleteOne({ _id: new ObjectId(_id) })
  }
}

const examQuestionService = new ExamQuestionService()
export default examQuestionService
