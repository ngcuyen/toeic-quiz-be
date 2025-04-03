import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { CategoryDto } from '~/dtos/Category.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Category from '~/models/schemas/Categories.schema'
import { databaseService } from '~/services/connectDB.service'

class CategoryService {
  async create(payload: CategoryDto): Promise<Category | null> {
    const categoryData = new Category({
      ...payload,
      created_at: new Date(Date.now())
    })
    const { insertedId } = await databaseService.categories.insertOne(categoryData)
    const newCategory = await databaseService.categories.findOne({ _id: insertedId })
    return newCategory
  }
  //get all categories
  async getAll(page: number, limit: number): Promise<PaginationType<Category> | null> {
    const categories = await databaseService.categories
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.categories.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: categories,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a category by id
  async getOne(_id: string): Promise<Category | null> {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(_id) })
    if (!category) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.CATEGORY.NOT_FOUND
      })
    }
    return category
  }

  //update a category
  async update(_id: string, payload: CategoryDto): Promise<Category | null> {
    console.log('🚀 ~ CategoryService ~ update ~ _id:', _id)
    const category = await databaseService.categories.findOne({ _id: new ObjectId(_id) })
    if (!category) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.CATEGORY.NOT_FOUND
      })
    }
    await databaseService.categories.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...payload,
          updated_at: new Date(Date.now())
        }
      }
    )
    const updatedQuestion = await databaseService.categories.findOne({ _id: new ObjectId(_id) })
    return updatedQuestion
  }

  //delete a category
  async delete(_id: string): Promise<any> {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(_id) })
    if (!category) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.CATEGORY.NOT_FOUND
      })
    }
    await databaseService.categories.deleteOne({ _id: new ObjectId(_id) })
  }
}

const categoryService = new CategoryService()
export default categoryService
