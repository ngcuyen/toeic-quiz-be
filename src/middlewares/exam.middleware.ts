import { isRequiredAndString } from './commons.middleware'
import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import validate from '~/utils/validate'

export const examValidator = validate(
  checkSchema({
    title: {
      isLength: {
        options: {
          min: 3,
          max: 200
        },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.EXAM.TITLE.LENGTH_MUST_BE_FROM_3_TO_200
      },
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.EXAM.TITLE.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.EXAM.TITLE.IS_REQUIRED
      })
    },
    description: {
      isLength: {
        options: {
          min: 3,
          max: 200
        },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.EXAM.DESCRIPTION.LENGTH_MUST_BE_FROM_3_TO_200
      },
      ...isRequiredAndString({
        isStringMsg: MESSAGES.VALIDATION_MESSAGES.EXAM.DESCRIPTION.MUST_BE_STRING,
        notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.EXAM.DESCRIPTION.IS_REQUIRED
      })
    }
  })
)
