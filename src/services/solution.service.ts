import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '~/constants/message'
import { CreateSolutionDto, UpdateSolutionDto } from '~/dtos/Solution.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from './connectDB.service'
import { ObjectId } from 'mongodb'
import Solution from '~/models/schemas/Solutions.schema'
import { GetSolutionResponse } from '~/@types/response.type'
import { StatusType } from '~/constants/enums'
import { QueryType } from '~/@types/auth.type'

class SolutionService {
  async getAll(payload: QueryType) {
    try {
      const page = parseInt(payload.page) || 1
      const limit = parseInt(payload.limit) || 10
      const totalCount = await databaseService.solutions.countDocuments({ status: StatusType.Public })
      if (totalCount === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }

      const pagenumber = totalCount / limit
      const skip = (page - 1) * limit
      const items = await databaseService.solutions.find({ status: StatusType.Public }).limit(limit).skip(skip).toArray()

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

  async create(payload: CreateSolutionDto): Promise<void> {
    try {
      const { description, image, bug_id } = payload
      const existingBug = await databaseService.bugs.findOne({ _id: new ObjectId(bug_id) })
      if (!existingBug) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.SOLUTION.BUG_ID_NOTFOUND
        })
      }
      const newSolution = new Solution({
        description,
        image,
        bug_id,
        status: StatusType.Pending
      })

      await databaseService.solutions.insertOne(newSolution)
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

  async getById(id: string): Promise<GetSolutionResponse> {
    try {
      const existingSolution = await databaseService.solutions.findOne({ _id: new ObjectId(id) })
      if (!existingSolution) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.SOLUTION.GET_BY_ID
        })
      }
      if (existingSolution.status !== StatusType.Public) return
      return existingSolution
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

  async update(payload: UpdateSolutionDto): Promise<GetSolutionResponse> {
    try {
      const { id, description, image, bug_id, status } = payload

      const existingSolution = await databaseService.solutions.findOne({ _id: new ObjectId(id) })
      if (!existingSolution) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.SOLUTION.UPDATE
        })
      }
      const updateContent = {
        description,
        image,
        bug_id,
        status,
        updated_at: new Date()
      }
      const updatedSolution = await databaseService.solutions.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateContent }, { returnDocument: 'after', upsert: false })
      return updatedSolution
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
      const existingSolution = await databaseService.solutions.findOne({ _id: new ObjectId(id) })
      if (!existingSolution || existingSolution.status === StatusType.Deleted) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.SOLUTION.NOT_FOUND
        })
      }
      await databaseService.solutions.updateOne({ _id: new ObjectId(id) }, { $set: { status: StatusType.Deleted, updated_at: new Date() } }, { upsert: false })
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

const solutionService = new SolutionService()
export default solutionService
