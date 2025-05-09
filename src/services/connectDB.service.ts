import { Db, MongoClient, ServerApiVersion, Collection, ClientSession } from 'mongodb'
import { env } from '~/config/environment.config'
import { MESSAGES } from '~/constants/message'
import Blank from '~/models/schemas/Blanks.schema'
import Category from '~/models/schemas/Categories.schema'
import ExamQuestion from '~/models/schemas/ExamQuestions.schema'
import Exam from '~/models/schemas/Exams.schema'
import OTP from '~/models/schemas/Otps.schema'
import Paragraph from '~/models/schemas/Paragraphs.schema'
import Question from '~/models/schemas/Questions.schema'
import QuizSession from '~/models/schemas/QuizSessions.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/Users.schema'

class DatabaseServices {
  private client: MongoClient | undefined
  private db: Db
  constructor() {
    this.client = new MongoClient(env.database.main.url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(env.database.main.name)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log(MESSAGES.DATABASE.CONNECT_SUCCESS)
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  async disConnect() {
    try {
      await this.client.close()
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }

  startSession(): ClientSession {
    return this.client.startSession()
  }

  get users(): Collection<User> {
    return this.db.collection(env.database.main.collection.users as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(env.database.main.collection.refresh_tokens as string)
  }

  get otps(): Collection<OTP> {
    return this.db.collection(env.database.main.collection.otps as string)
  }
  get questions(): Collection<Question> {
    return this.db.collection(env.database.main.collection.questions as string)
  }
  get categories(): Collection<Category> {
    return this.db.collection(env.database.main.collection.categories as string)
  }
  get paragraphs(): Collection<Paragraph> {
    return this.db.collection(env.database.main.collection.paragraphs as string)
  }
  get blanks(): Collection<Blank> {
    return this.db.collection(env.database.main.collection.blanks as string)
  }
  get exams(): Collection<Exam> {
    return this.db.collection(env.database.main.collection.exams as string)
  }
  get examQuestions(): Collection<ExamQuestion> {
    return this.db.collection(env.database.main.collection.examQuestions as string)
  }
  get quizSessions(): Collection<QuizSession> {
    return this.db.collection(env.database.main.collection.quizSessions as string)
  }
}

export const databaseService = new DatabaseServices()
