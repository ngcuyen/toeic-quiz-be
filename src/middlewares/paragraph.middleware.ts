import { isRequiredAndString } from './commons.middleware'
import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import validate from '~/utils/validate'

export const paragraphValidator = validate(
  checkSchema({
    name: {
      isLength: {
        options: {
          min: 3,
          max: 100
        },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.PARAGRAPH.NAME.LENGTH_MUST_BE_FROM_3_TO_100
      },
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.PARAGRAPH.NAME.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.PARAGRAPH.NAME.IS_REQUIRED
      })
    }
  })
)
