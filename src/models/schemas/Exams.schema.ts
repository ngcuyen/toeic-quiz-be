import { ObjectId } from 'mongodb'

interface ExamType {
  _id?: ObjectId
  title: string
  description: string
  user_id: ObjectId
  created_at: Date
  updated_at?: Date
}

export default class Exam {
  _id?: ObjectId
  title: string
  description: string
  user_id: ObjectId
  created_at: Date
  updated_at?: Date

  constructor(item: ExamType) {
    this._id = item._id
    this.title = item.title
    this.description = item.description
    this.user_id = item.user_id
    this.created_at = item.created_at || new Date(Date.now())
    this.updated_at = item.updated_at || null
  }
}
