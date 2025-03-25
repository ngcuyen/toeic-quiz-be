import { ObjectId } from 'mongodb'

interface QuizResponseType {
  _id?: ObjectId
  quiz_session_id: ObjectId
  question_id: ObjectId
  selected_answer: string
  is_correct: boolean
}

export default class QuizResponse {
  _id?: ObjectId
  quiz_session_id: ObjectId
  question_id: ObjectId
  selected_answer: string
  is_correct: boolean

  constructor(item: QuizResponseType) {
    this._id = item._id
    this.quiz_session_id = item.quiz_session_id
    this.question_id = item.question_id
    this.selected_answer = item.selected_answer
    this.is_correct = item.is_correct
  }
}
