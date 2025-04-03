import { isRequiredAndString } from './commons.middleware'
import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import validate, { validateObjectId } from '~/utils/validate'

export const blankValidator = validate(
  checkSchema({
    paragraph_id: {
      custom: {
        options: async (value) => {
          validateObjectId(value, MESSAGES.VALIDATION_MESSAGES.COMMONS.INVALID_ID)
          return true
        }
      },
      notEmpty: {
        errorMessage: MESSAGES.VALIDATION_MESSAGES.BLANK.PARAGRAPH_ID.IS_REQUIRED
      }
    },
    blank_position: {
      isInt: {
        options: { min: 0 },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.BLANK.BLANK_POSITION.MUST_BE_INTEGER
      },
      notEmpty: {
        errorMessage: MESSAGES.VALIDATION_MESSAGES.BLANK.BLANK_POSITION.IS_REQUIRED
      }
    },
    correct_answer: {
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.BLANK.CORRECT_ANSWER.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.BLANK.CORRECT_ANSWER.IS_REQUIRED
      })
    }
  })
)
