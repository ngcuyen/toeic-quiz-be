import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import { env } from '~/config/environment.config'
import { MESSAGES } from '~/constants/message'
import Blog from '~/models/schemas/Blogs.schema'
import Bookmark from '~/models/schemas/Bookmarks.schema'
import Bug from '~/models/schemas/Bugs.schema'
import OTP from '~/models/schemas/Otps.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Solution from '~/models/schemas/Solutions.schema'
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

  get blogs(): Collection<Blog> {
    return this.db.collection(env.database.main.collection.blogs as string)
  }

  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(env.database.main.collection.bookmarks as string)
  }

  get comments(): Collection<Comment> {
    return this.db.collection(env.database.main.collection.comments as string)
  }

  get bugs(): Collection<Bug> {
    return this.db.collection(env.database.main.collection.bugs as string)
  }

  get solutions(): Collection<Solution> {
    return this.db.collection(env.database.main.collection.solutions as string)
  }
}

export const databaseService = new DatabaseServices()
