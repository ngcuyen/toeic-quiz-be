import { ObjectId } from 'mongodb'

interface BlankType {
  _id?: ObjectId
  paragraph_id: string
  blank_position: number
  correct_answer: string
}

export default class Blank {
  _id?: ObjectId
  paragraph_id: string
  blank_position: number
  correct_answer: string

  constructor(item: BlankType) {
    this._id = item._id
    this.paragraph_id = item.paragraph_id
    this.blank_position = item.blank_position
    this.correct_answer = item.correct_answer
  }
}
