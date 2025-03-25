import { ObjectId } from 'mongodb'

interface ExamQuestionType {
  _id?: ObjectId
  exam_id: ObjectId
  question_id: ObjectId
}

export default class ExamQuestion {
  _id?: ObjectId
  exam_id: ObjectId
  question_id: ObjectId

  constructor(item: ExamQuestionType) {
    this._id = item._id
    this.exam_id = item.exam_id
    this.question_id = item.question_id
  }
}
