import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType } from '~/@types/pagination.type'
import { MESSAGES } from '~/constants/message'
import { ParagraphDto } from '~/dtos/Paragraph.dto'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Paragraph from '~/models/schemas/Paragraphs.schema'
import { databaseService } from '~/services/connectDB.service'

class ParagraphService {
  async create(payload: ParagraphDto): Promise<Paragraph | null> {
    const paragraphData = new Paragraph({
      ...payload,
      created_at: new Date(Date.now())
    })
    const { insertedId } = await databaseService.paragraphs.insertOne(paragraphData)
    const newParagraph = await databaseService.paragraphs.findOne({ _id: insertedId })
    return newParagraph
  }
  //get all paragraphs
  async getAll(page: number, limit: number): Promise<PaginationType<Paragraph> | null> {
    const paragraphs = await databaseService.paragraphs
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    const total = await databaseService.paragraphs.count()
    const totalPages = Math.ceil(total / limit)
    return {
      items: paragraphs,
      page,
      per_page: limit,
      total_pages: totalPages,
      total_items: total
    }
  }

  //get a paragraph by id
  async getOne(_id: string): Promise<Paragraph | null> {
    const paragraph = await databaseService.paragraphs.findOne({ _id: new ObjectId(_id) })
    if (!paragraph) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.PARAGRAPH.NOT_FOUND
      })
    }
    return paragraph
  }

  //update a paragraph
  async update(_id: string, payload: ParagraphDto): Promise<Paragraph | null> {
    const paragraph = await databaseService.paragraphs.findOne({ _id: new ObjectId(_id) })
    if (!paragraph) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.PARAGRAPH.NOT_FOUND
      })
    }
    await databaseService.paragraphs.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...payload,
          updated_at: new Date(Date.now())
        }
      }
    )
    const updatedParagraph = await databaseService.paragraphs.findOne({ _id: new ObjectId(_id) })
    return updatedParagraph
  }

  //delete a paragraph
  async delete(_id: string): Promise<any> {
    const paragraph = await databaseService.paragraphs.findOne({ _id: new ObjectId(_id) })
    if (!paragraph) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.PARAGRAPH.NOT_FOUND
      })
    }
    await databaseService.paragraphs.deleteOne({ _id: new ObjectId(_id) })
  }
}

const paragraphService = new ParagraphService()
export default paragraphService
