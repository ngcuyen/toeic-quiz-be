import { ObjectId } from 'mongodb'

interface QuizSessionType {
  _id?: ObjectId
  user_id: ObjectId
  exam_id: ObjectId
  start_time: Date
  end_time?: string
  score?: number
}

export default class QuizSession {
  _id?: ObjectId
  user_id: ObjectId
  exam_id: ObjectId
  start_time: Date
  end_time?: string
  score?: number

  constructor(item: QuizSessionType) {
    this._id = item._id
    this.user_id = item.user_id
    this.exam_id = item.exam_id
    this.start_time = item.start_time || new Date(Date.now())
    this.end_time = item.end_time || null
    this.score = item.score
  }
}
