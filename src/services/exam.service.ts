import { StatusCodes } from 'http-status-codes'
import { ClientSession, ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { CategoryQuota, ExamDto } from '~/dtos/Exam.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import ExamQuestion from '~/models/schemas/ExamQuestions.schema'
import Exam from '~/models/schemas/Exams.schema'
import QuizSession from '~/models/schemas/QuizSessions.schema'
import { databaseService } from '~/services/connectDB.service'

class ExamService {
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

  //create random exam
  async createRandomExam(userId: string, title: string, description: string): Promise<Exam | null> {
    const session = databaseService.startSession()
    try {
      let newExam: Exam | null = null

      await session.withTransaction(async () => {
        // 🔁 Tái sử dụng hàm create
        newExam = await this.create({
          title: title || 'Bài kiểm tra ngẫu nhiên',
          description: description || 'Tạo tự động',
          user_id: new ObjectId(userId)
        })

        if (!newExam?._id) throw new Error('Tạo bài kiểm tra thất bại.')

        const usedQuestionIds = await this.getUsedQuestionIds(userId, session)
        const selectedQuestions = await this.selectRandomQuestions(usedQuestionIds, session)
        await this.saveExamQuestions(newExam._id, selectedQuestions, session)
        await this.createQuizSession(userId, newExam._id, session)
      })

      return newExam
    } catch (error) {
      console.error('Lỗi khi tạo bài kiểm tra ngẫu nhiên:', error)
      throw error
    } finally {
      await session.endSession()
    }
  }

  //create a exam
  async create(payload: ExamDto): Promise<Exam | null> {
    const examData = new Exam({
      ...payload
    })
    const { insertedId } = await databaseService.exams.insertOne(examData)
    const newExam = await databaseService.exams.findOne({ _id: insertedId })
    return newExam
  }

  //lấy câu hỏi đã sử dụng
  private async getUsedQuestionIds(userId: string, session: ClientSession): Promise<Set<string>> {
    const used = await databaseService.quizSessions
      .aggregate(
        [
          { $match: { user_id: new ObjectId(userId) } },
          {
            $lookup: {
              from: 'exam_questions',
              localField: 'exam_id',
              foreignField: 'exam_id',
              as: 'exam_questions'
            }
          },
          { $unwind: '$exam_questions' },
          {
            $group: {
              _id: null,
              question_ids: { $addToSet: '$exam_questions.question_id' }
            }
          },
          { $project: { _id: 0, question_ids: 1 } }
        ],
        { session }
      )
      .toArray()

    return new Set(used.length > 0 ? used[0].question_ids.map((id: ObjectId) => id.toString()) : [])
  }

  //chọn câu hỏi ngẫu nhiên từ các danh mục
  private async selectRandomQuestions(usedQuestionIdsSet: Set<string>, session: ClientSession): Promise<ObjectId[]> {
    const categoryQuotas: CategoryQuota[] = [
      { category_id: new ObjectId('category1_id'), num_questions: 10 },
      { category_id: new ObjectId('category2_id'), num_questions: 10 }
    ]

    const selectedQuestions: ObjectId[] = []

    for (const { category_id, num_questions } of categoryQuotas) {
      const randomQuestions = await databaseService.questions
        .aggregate(
          [
            {
              $match: {
                category_id,
                _id: { $nin: Array.from(usedQuestionIdsSet).map((id) => new ObjectId(id)) }
              }
            },
            { $sample: { size: num_questions } }
          ],
          { session }
        )
        .toArray()

      if (randomQuestions.length < num_questions) {
        throw new Error(`Không đủ câu hỏi trong danh mục ${category_id}.`)
      }

      selectedQuestions.push(...randomQuestions.map((q) => q._id))
    }

    return selectedQuestions
  }

  //lưu câu hỏi vào exam question
  private async saveExamQuestions(examId: ObjectId, questionIds: ObjectId[], session: ClientSession) {
    const docs = questionIds.map((qid) => ({
      exam_id: examId,
      question_id: qid
    }))
    await databaseService.examQuestions.insertMany(
      docs.map((d) => new ExamQuestion(d)),
      { session }
    )
  }

  //tạo phiên làm bài
  private async createQuizSession(userId: string, examId: ObjectId, session: ClientSession) {
    const quizSession = new QuizSession({
      user_id: new ObjectId(userId),
      exam_id: examId,
      start_time: new Date(),
      score: 0
    })
    await databaseService.quizSessions.insertOne(quizSession, { session })
  }
}

const examService = new ExamService()
export default examService
