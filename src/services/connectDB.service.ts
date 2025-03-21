import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import { env } from '~/config/environment.config'
import { MESSAGES } from '~/constants/message'
import OTP from '~/models/schemas/Otps.schema'
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

  get users(): Collection<User> {
    return this.db.collection(env.database.main.collection.users as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(env.database.main.collection.refresh_tokens as string)
  }

  get otps(): Collection<OTP> {
    return this.db.collection(env.database.main.collection.otps as string)
  }
}

export const databaseService = new DatabaseServices()
