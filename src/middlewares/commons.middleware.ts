import { checkSchema } from 'express-validator'
import { MESSAGES } from '~/constants/message'

import validate, { validateObjectId } from '~/utils/validate'

export const idParamValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            validateObjectId(value, MESSAGES.VALIDATION_MESSAGES.COMMONS.INVALID_ID)
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const paginationValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: MESSAGES.VALIDATION_MESSAGES.COMMONS.PAGINATION.INVALID_PAGE
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: MESSAGES.VALIDATION_MESSAGES.COMMONS.PAGINATION.ITEMS_OUT_OF_RANGE
        },
        toInt: true
      }
    },
    ['query']
  )
)

export const paginationUserValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: MESSAGES.VALIDATION_MESSAGES.COMMONS.PAGINATION.INVALID_PAGE
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: MESSAGES.VALIDATION_MESSAGES.COMMONS.PAGINATION.ITEMS_OUT_OF_RANGE
        },
        toInt: true
      },
      query: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true,
        custom: {
          options: (value) => ['first_name', 'last_name'].includes(value.toLowerCase()),
          errorMessage: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.INVALID_INCLUDES
        }
      }
    },
    ['query']
  )
)

export const isRequiredAndString = ({ isStringMsg, notEmptyMsg }: { isStringMsg: string; notEmptyMsg: string }) => ({
  isString: {
    errorMessage: isStringMsg
  },
  notEmpty: {
    errorMessage: notEmptyMsg
  }
})
