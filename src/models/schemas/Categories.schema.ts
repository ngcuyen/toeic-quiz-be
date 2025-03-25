import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at?: Date
}

export default class Category {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at?: Date

  constructor(item: CategoryType) {
    this._id = item._id
    this.name = item.name
    this.created_at = item.created_at || new Date(Date.now())
    this.updated_at = item.updated_at || null
  }
}
