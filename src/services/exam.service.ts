import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { ExamDto } from '~/dtos/Exam.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Exam from '~/models/schemas/Exams.schema'
import { databaseService } from '~/services/connectDB.service'

class ExamService {
  //create a exam
  async create(payload: ExamDto): Promise<Exam | null> {
    const examData = new Exam({
      ...payload
    })
    const { insertedId } = await databaseService.exams.insertOne(examData)
    const newExam = await databaseService.exams.findOne({ _id: insertedId })
    return newExam
  }
  //get all exams
  async getAll(page: number, limit: number): Promise<PaginationType<Exam> | null> {
    const exams = await databaseService.exams
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.exams.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: exams,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a exam by id
  async getOne(_id: string): Promise<Exam | null> {
    const exam = await databaseService.exams.findOne({ _id: new ObjectId(_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    return exam
  }

  //update a exam
  async update(_id: string, payload: ExamDto): Promise<Exam | null> {
    const exam = await databaseService.exams.findOne({ _id: new ObjectId(_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    await databaseService.exams.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...payload,
          updated_at: new Date(Date.now())
        }
      }
    )
    const updatedExam = await databaseService.exams.findOne({ _id: new ObjectId(_id) })
    return updatedExam
  }

  //delete a exam
  async delete(_id: string): Promise<any> {
    const exam = await databaseService.exams.findOne({ _id: new ObjectId(_id) })
    if (!exam) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.EXAM.NOT_FOUND
      })
    }
    await databaseService.exams.deleteOne({ _id: new ObjectId(_id) })
  }
}

const examService = new ExamService()
export default examService
