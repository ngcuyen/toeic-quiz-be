import { ObjectId } from 'mongodb'

interface ParagraphType {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at?: Date
}

export default class Paragraph {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at?: Date

  constructor(item: ParagraphType) {
    this._id = item._id
    this.name = item.name
    this.created_at = item.created_at || new Date(Date.now())
    this.updated_at = item.updated_at || null
  }
}
