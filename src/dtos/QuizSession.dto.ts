import { ObjectId } from 'mongodb'

export interface QuizSessionDto {
  exam_id: ObjectId
  user_id: ObjectId
}
