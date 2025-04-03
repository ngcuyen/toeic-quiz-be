import { isRequiredAndString } from './commons.middleware'
import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import validate from '~/utils/validate'

export const categoryValidator = validate(
  checkSchema({
    name: {
      isLength: {
        options: {
          min: 3,
          max: 100
        },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.CATEGORIES.NAME.LENGTH_MUST_BE_FROM_3_TO_100
      },
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.CATEGORIES.NAME.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.CATEGORIES.NAME.IS_REQUIRED
      })
    }
  })
)
