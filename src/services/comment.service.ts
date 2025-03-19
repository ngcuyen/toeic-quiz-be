import { StatusCodes } from 'http-status-codes'
import { MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from './connectDB.service'
import { GetCommentResponse } from '~/@types/response.type'
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import { CommentDto } from '~/dtos/Comment.dto'
class CommentService {
  async create(id: string, payload: CommentDto): Promise<void> {}

  async getAll(): Promise<GetCommentResponse> {
    try {
      return
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_MESSAGES.BUG.GET_ALL
      })
    }
  }

  async getById(id: string): Promise<GetCommentResponse> {
    try {
      const existingComment = await databaseService.comments.findOne({ _id: new ObjectId(id) })
      if (!existingComment) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }

      //   const { _id, user_id, solution_id, content, parent_id, left_value, right_value, created_at, updated_at } = existingComment
      //   return {
      //     _id,
      //     user_id,
      //     solution_id,
      //     content,
      //     parent_id,
      //     left_value,
      //     right_value,
      //     created_at,
      //     updated_at
      //   }
      return
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

  async update(id: string, payload: CommentDto): Promise<GetCommentResponse> {
    try {
      const { solution_id, content, parent_id, left_value, right_value } = payload
      const body = { solution_id, content, parent_id, left_value, right_value }
      if (Object.keys(body).length === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: MESSAGES.VALIDATION_MESSAGES.USER.PROFILE.FIELD_UPDATE_IS_REQUIRED
        })
      }

      const existingCmt = await databaseService.comments.findOne({ _id: new ObjectId(id) })
      if (!existingCmt) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: MESSAGES.ERROR_MESSAGES.BUG.NOT_FOUND
        })
      }
      const updateContent = {
        solution_id,
        content,
        parent_id,
        left_value,
        right_value,
        updated_at: new Date()
      }
      const updatedCmt = await databaseService.comments.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateContent }, { returnDocument: 'after', upsert: false })
      //   return updatedCmt
      return
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
      //   const existingCmt = await databaseService.comments.findOne({ _id: new ObjectId(id) })
      //   await databaseService.comments.updateOne({ _id: new ObjectId(id) }, { $set: { status: StatusType.Deleted, updated_at: new Date() } }, { upsert: false })
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

const commentService = new CommentService()

export default commentService
