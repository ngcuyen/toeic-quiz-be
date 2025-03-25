import { ObjectId } from 'mongodb'

interface QuestionType {
  _id?: ObjectId
  question_text: string
  paragraph_id?: Date
  category_id: Date
  image_url?: Date
  opt_a: string
  opt_b: string
  opt_c: string
  opt_d: string
  answer: string
  created_at: Date
  updated_at?: Date
}

export default class Question {
  _id?: ObjectId
  question_text: string
  paragraph_id?: Date
  category_id: Date
  image_url?: Date
  opt_a: string
  opt_b: string
  opt_c: string
  opt_d: string
  answer: string
  created_at: Date
  updated_at?: Date

  constructor(item: QuestionType) {
    this._id = item._id
    this.question_text = item.question_text
    this.paragraph_id = item.paragraph_id
    this.category_id = item.category_id
    this.image_url = item.image_url || null
    this.opt_a = item.opt_a
    this.opt_b = item.opt_b
    this.opt_c = item.opt_c
    this.opt_d = item.opt_d
    this.answer = item.answer
    this.created_at = item.created_at || new Date(Date.now())
    this.updated_at = item.updated_at || null
  }
}
