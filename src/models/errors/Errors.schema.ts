import moment from 'moment'
import { StatusCodes } from 'http-status-codes'
import { ErrorEntityType, ErrorType } from '~/@types/errors.type'
import { MESSAGES } from '~/constants/message'

type ErrorsType = Record<string, ErrorEntityType>

export class ErrorWithStatus {
  statusCode: number
  message: string
  created_at: string
  updated_at: string
  messageConstants: string

  constructor(item: ErrorType) {
    this.statusCode = item.statusCode
    this.message = item.message
    this.created_at = item.created_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    this.updated_at = item.updated_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    this.messageConstants = item.messageConstants || null
  }
}

export class ErrorEnity extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = MESSAGES.VALIDATION_MESSAGES.TITLE, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, statusCode: StatusCodes.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
