import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '~/constants/message'
import { CreateBugDto, UpdateBugDto } from '~/dtos/Bug.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Bug from '~/models/schemas/Bugs.schema'
import { databaseService } from './connectDB.service'
import { GetBugResponse } from '~/@types/response.type'
import { ObjectId } from 'mongodb'
import { StatusType } from '~/constants/enums'
import _ from 'lodash'
import { QueryType } from '~/@types/auth.type'

class BugService {
  async create(payload: CreateBugDto): Promise<void> {
    try {
      const { title, description, image } = payload
      const newBug = new Bug({
        title,
        description,
        image,
        status: StatusType.Pending
      })
      await databaseService.bugs.insertOne(newBug)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_ALL
      })
    }
  }

  async getAll(payload: QueryType) {
    try {
      const page = parseInt(payload.page) || 1
      const limit = parseInt(payload.limit) || 10
      const totalCount = await databaseService.bugs.countDocuments({ status: StatusType.Public })
      if (totalCount === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }

      const pagenumber = totalCount / limit
      const skip = (page - 1) * limit
      const items = await databaseService.bugs.find({ status: StatusType.Public }).limit(limit).skip(skip).toArray()

      return {
        items: items,
        totalItems: totalCount,
        itemsPerPage: limit,
        totalPages: Math.ceil(pagenumber),
        currentPage: page
      }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_ALL
      })
    }
  }

  async getById(id: string): Promise<GetBugResponse> {
    try {
      const existingBug = await databaseService.bugs.findOne({ _id: new ObjectId(id) })
      if (!existingBug) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }
      if (existingBug.status !== StatusType.Public) return

      const { _id, title, description, status, image, created_at, updated_at } = existingBug
      return {
        _id,
        title,
        description,
        image,
        status,
        created_at,
        updated_at
      }
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_BY_ID
      })
    }
  }

  async update(payload: UpdateBugDto): Promise<GetBugResponse> {
    try {
      const { id, title, description, image, status } = payload
      const body = { title, description, image, status }
      if (Object.keys(body).length === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.FIELD_UPDATE_IS_REQUIRED
        })
      }

      const existingBug = await databaseService.bugs.findOne({ _id: new ObjectId(id) })
      if (!existingBug) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }
      const updateContent = {
        title,
        description,
        image,
        status,
        updated_at: new Date()
      }
      const updatedBug = await databaseService.bugs.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateContent }, { returnDocument: 'after', upsert: false })
      return updatedBug
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_ALL
      })
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const existingBug = await databaseService.bugs.findOne({ _id: new ObjectId(id) })
      if (!existingBug || existingBug.status === StatusType.Deleted) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }
      await databaseService.bugs.updateOne({ _id: new ObjectId(id) }, { $set: { status: StatusType.Deleted, updated_at: new Date() } }, { upsert: false })
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error
      }
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_ALL
      })
    }
  }
}

const bugService = new BugService()

export default bugService
