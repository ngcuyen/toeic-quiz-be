import { ObjectId } from 'mongodb'

export interface ExamQuestionDto {
  question_id: ObjectId
  exam_id: ObjectId
}
