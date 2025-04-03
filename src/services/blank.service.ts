import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { BlankDto } from '~/dtos/Blank.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Blank from '~/models/schemas/Blanks.schema'
import { databaseService } from '~/services/connectDB.service'

class BlankService {
  async checkParagraphExist(paragraph_id: string): Promise<boolean> {
    const paragraph = await databaseService.paragraphs.findOne({ _id: new ObjectId(paragraph_id) })
    if (!paragraph) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.PARAGRAPH.NOT_FOUND
      })
    }
    return !!paragraph
  }

  //create a Blank
  async create(payload: BlankDto): Promise<Blank | null> {
    const { paragraph_id } = payload
    await this.checkParagraphExist(paragraph_id)

    const blankData = new Blank({
      ...payload
    })
    const { insertedId } = await databaseService.blanks.insertOne(blankData)
    const newBlank = await databaseService.blanks.findOne({ _id: insertedId })
    return newBlank
  }
  //get all blanks
  async getAll(page: number, limit: number): Promise<PaginationType<Blank> | null> {
    const blanks = await databaseService.blanks
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.blanks.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: blanks,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a Blank by id
  async getOne(_id: string): Promise<Blank | null> {
    const blank = await databaseService.blanks.findOne({ _id: new ObjectId(_id) })
    if (!blank) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.BLANK.NOT_FOUND
      })
    }
    return blank
  }

  //update a Blank
  async update(_id: string, payload: BlankDto): Promise<Blank | null> {
    const { paragraph_id } = payload
    await this.checkParagraphExist(paragraph_id)
    const blank = await databaseService.blanks.findOne({ _id: new ObjectId(_id) })
    if (!blank) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.BLANK.NOT_FOUND
      })
    }
    await databaseService.blanks.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...payload,
          updated_at: new Date(Date.now())
        }
      }
    )
    const updatedBlank = await databaseService.blanks.findOne({ _id: new ObjectId(_id) })
    return updatedBlank
  }

  //delete a Blank
  async delete(_id: string): Promise<any> {
    const blank = await databaseService.blanks.findOne({ _id: new ObjectId(_id) })
    if (!blank) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.BLANK.NOT_FOUND
      })
    }
    await databaseService.blanks.deleteOne({ _id: new ObjectId(_id) })
  }
}

const blankService = new BlankService()
export default blankService
