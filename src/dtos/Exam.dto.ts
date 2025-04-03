import { ObjectId } from 'mongodb'

export interface ExamDto {
  title: string
  description: string
  user_id: ObjectId
}
