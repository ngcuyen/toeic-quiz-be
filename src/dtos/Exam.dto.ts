import { ObjectId } from 'mongodb'

export interface ExamDto {
  title: string
  description: string
  user_id: ObjectId
}

export interface CategoryQuota {
  category_id: ObjectId
  num_questions: number
}
