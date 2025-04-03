import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'
import { isRequiredAndString } from '~/middlewares/commons.middleware'
import validate, { validateObjectId } from '~/utils/validate'

export const questionValidator = validate(
  checkSchema({
    question_text: {
      isString: {
        errorMessage: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.QUESTION_TEXT.MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 3,
          max: 1000
        },
        errorMessage: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.QUESTION_TEXT.LENGTH_MUST_BE_FROM_3_TO_1000
      }
    },
    paragraph_id: {
      isString: {
        errorMessage: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.PARAGRAPH_ID.MUST_BE_A_STRING
      },
      custom: {
        options: async (value) => {
          if (validateObjectId(value, MESSAGES.VALIDATION_MESSAGES.QUESTIONS.PARAGRAPH_ID.MUST_BE_VALID_OBJECT_ID)) {
            return true
          }
        }
      }
    },
    category_id: {
      isString: {
        errorMessage: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.CATEGORY_ID.MUST_BE_A_STRING
      },
      custom: {
        options: async (value) => {
          if (validateObjectId(value, MESSAGES.VALIDATION_MESSAGES.QUESTIONS.CATEGORY_ID.MUST_BE_VALID_OBJECT_ID)) {
            return true
          }
        }
      }
    },
    image_url: {
      optional: true,
      errorMessage: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.IMAGE.MUST_BE_VALID_URL
    },
    opt_a: isRequiredAndString({
      isStringMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.MUST_BE_A_STRING,
      notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.IS_REQUIRED
    }),
    opt_b: isRequiredAndString({
      isStringMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.MUST_BE_A_STRING,
      notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.IS_REQUIRED
    }),

    opt_c: isRequiredAndString({
      isStringMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.MUST_BE_A_STRING,
      notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.IS_REQUIRED
    }),
    opt_d: isRequiredAndString({
      isStringMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.MUST_BE_A_STRING,
      notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.OPTION.IS_REQUIRED
    }),
    answer: isRequiredAndString({
      isStringMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.ANSWER.MUST_BE_A_STRING,
      notEmptyMsg: MESSAGES.VALIDATION_MESSAGES.QUESTIONS.ANSWER.IS_REQUIRED
    })
  })
)
