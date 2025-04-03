import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import { isRequiredAndString } from '~/middlewares/commons.middleware'
import validate, { validateObjectId } from '~/utils/validate'

export const quizSessionValidator = validate(
  checkSchema({
    exam_id: {
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.EXAM_QUESTION.EXAM_ID.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.EXAM_QUESTION.EXAM_ID.IS_REQUIRED
      }),
      custom: {
        options: async (value) => {
          validateObjectId(value, MESSAGES.VALIDATION_MESSAGES.EXAM_QUESTION.EXAM_ID.VALID_ID)
          return true
        }
      }
    }
  })
)
