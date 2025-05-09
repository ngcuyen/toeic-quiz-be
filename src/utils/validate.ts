import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { ErrorEnity, ErrorWithStatus } from '~/models/errors/Errors.schema'

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Truyền req vào để tiến hành validate dữ liệu
    await Promise.all(validations.map((validation) => validation.run(req)))

    // Đưa lỗi vào biến req -> gọi validation result để nhận lỗi
    const errors = validationResult(req)

    // Không có lỗi thì next tiếp tục request
    if (errors.isEmpty()) {
      return next()
    }

    const errorObject = errors.mapped()
    const entityError = new ErrorEnity({ errors: {} })

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
        // msg có tồn tại trong ErrorWithStatus và status phải khác với 422 tức là lỗi validation
        if (msg instanceof ErrorWithStatus && msg.statusCode !== StatusCodes.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }
      }
      entityError.errors[key] = errorObject[key]
    }

    // Lỗi do validation thông thường
    next(entityError)
  }
}

export const validateObjectId = (value: string, message: string) => {
  if (!ObjectId.isValid(value)) {
    throw new ErrorWithStatus({
      message: message,
      statusCode: StatusCodes.NOT_FOUND
    })
  }

  return true
}

export default validate
