import slugify from 'slugify'
import { MESSAGES } from '~/constants/message'
import User from '~/models/schemas/Users.schema'
import { databaseService } from '~/services/connectDB.service'
import { hashPassword } from './crypto'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { UserVerifyStatus } from '~/constants/enums'

// Generate slug from name
export const generateSlug = (name: string): string => {
  return slugify(name, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    trim: true
  })
}

// Validation using hot key enter username
export const containsNewline = (username: string): boolean => {
  const newlineRegex = /[\r\n]+/
  return newlineRegex.test(username)
}

// Validation email domain
export const validateEmailDomain = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|gmail\.edu\.com)$/
  return regex.test(email)
}

// Validation Vietnamese phone number
export const validatePhone = (phone: string): boolean => {
  const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/
  return regex.test(phone)
}

// Validattion first_name and last_name anphabetic charater
export const isValidNameCharater = (str: string): boolean => {
  const regex = /^[A-Za-zÀ-Ạà-ạÁ-Ắá-ắÂ-Ậâ-ậÄ-äÈ-Ẹè-ẹÉ-Ếé-ếÊ-Ệê-ệÌ-Ịì-ịÍ-íÒ-Ọò-ọÓ-Ốó-ốÔ-Ộô-ộÖ-öÙ-Ụù-ụÚ-Ứú-ứÛ-ûÜ-üĐđ\s]+$/
  return regex.test(str)
}

// Validation username charater
export const isValidUsername = (str: string): boolean => {
  const regex = /^(?!.*\.\.)[\w.-]{3,30}$/
  return regex.test(str)
}

// Validation name contains multiple consecutive spaces
export const isValidMulName = (name: string): boolean => {
  const excessiveWhitespaceRegex = /\s{2,}/
  return !excessiveWhitespaceRegex.test(name)
}

// Validation url avatar and cover photo
export const isValidImageUrl = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
  const imageRegex = /\.(jpeg|jpg|gif|png)$/
  return urlRegex.test(url) && imageRegex.test(url)
}

// Check gender includes: Male, Female, Other...ect..
export const isValidGender = (gender: string): boolean => {
  const validGenders = ['male', 'female', 'other']
  return validGenders.includes(gender.toLowerCase())
}

export const isValidStatus = (status: string): boolean => {
  const validBugStatus = ['pending', 'public', 'deleted']
  return validBugStatus.includes(status.toLowerCase())
}

export const isValidEmail = (email: string): boolean => {
  // Regex to check for at least one special character
  const specialCharRegex = /^[A-Za-z0-9._-]+@/
  // Regex to ensure the domain is either @gmail.com or @gmail.edu.com
  const domainRegex = /@(gmail\.com|gmail\.edu\.com)$/
  return specialCharRegex.test(email) && domainRegex.test(email)
}

// Validation password notifiation detail error
export const validateEmail = (email: string): { valid: boolean; message: string } => {
  const lengthUsernameEmail = /^[a-zA-Z0-9.]{6,30}@/
  const noSpecialCharRegex = /^[A-Za-z0-9._-]+@/
  // const domainRegex = /@(gmail\.com|gmail\.edu\.com)$/
  if (!lengthUsernameEmail.test(email)) {
    return { valid: false, message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.VALID_EMAIL }
  }
  if (!noSpecialCharRegex.test(email)) {
    return { valid: false, message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.CONTAIN_SPECIAL_CHARACTER }
  }
  // if (!domainRegex.test(email)) {
  //   return { valid: false, message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.VALID_DOMAIN }
  // }
  return { valid: true, message: '' }
}

// Validation password check for absence of emojis and allow alphanumeric and some special characters
export const isValidPassword = (password: string): boolean => {
  const noEmojiRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
  return noEmojiRegex.test(password)
}

// Use a dedicated comparePassword function (assuming hashing is done elsewhere)
export const validatePassword = async (inputPassword: string, userPassword: string): Promise<boolean> => {
  return hashPassword(inputPassword) === userPassword ? true : false
}

// Checking user validate email and password exists
export const validateEmailAndPasswordExist = async (email: string, password: string): Promise<User | null> => {
  try {
    const hashedPassword = hashPassword(password)
    const user = await databaseService.users.findOne<User>({ email, password: hashedPassword })
    return user
  } catch (error) {
    console.error('Error validating email and password:', error)
    throw new Error('Error validating email and password')
  }
}

// Checks if a user exists by their ID.
export const validateUserIdExist = async (id: string): Promise<boolean> => {
  try {
    // Validate the ID format
    if (!ObjectId.isValid(id)) {
      throw new Error(`Invalid ID format: ${id}`)
    }
    // Using countDocuments for a potentially more performant existence check
    const result = await databaseService.users.findOne<User>({ _id: new ObjectId(id) })

    return Boolean(result)
  } catch (error) {
    console.error(`Error checking user existence: ${error.message}`)
    throw error // Rethrow or handle as needed
  }
}

export const hasAccountDelete = async (email: string): Promise<boolean> => {
  try {
    const user = await databaseService.users.findOne({ email }, { projection: { _id: 1, _destroy: 1 } })
    return !user?._destroy
  } catch (error) {
    console.error(`Error checking account delete: ${error.message}`)
    throw error // Rethrow or handle as needed
  }
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await databaseService.users.findOne({ email })
  } catch (error) {
    console.error('Failed to find user by email:', error)
    throw error // Rethrow or handle as needed
  }
}

// Validates the provided refresh token.
export const validateRefreshToken = async (refresh_token: string): Promise<boolean> => {
  try {
    const token: string | null = await databaseService.refreshTokens.findOne<string>({ token: refresh_token })
    return Boolean(token)
  } catch (error) {
    console.error('Error validating refresh token:', error)
    throw error // Rethrow to let the caller handle it or to fail loudly.
  }
}

// Utility function to check user verification status
const checkUserVerification = (verifyStatus: UserVerifyStatus): void => {
  if (verifyStatus === 'Unverified') {
    throw new ErrorWithStatus({
      statusCode: StatusCodes.FORBIDDEN,
      message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED
    })
  }

  if (verifyStatus === 'Banned') {
    throw new ErrorWithStatus({
      statusCode: StatusCodes.FORBIDDEN,
      message: MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
    })
  }
}
// Validate with ID account accessibiity
export const validateWithIDAccountAccessibility = async (id: string): Promise<boolean> => {
  try {
    const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.NOT_REGISTER
      })
    }
    checkUserVerification(user.verify)
    return true
  } catch (error) {
    throw error
  }
}

// Validate accunt accessibiity
export const validateAccountAccessibility = async (email: string) => {
  try {
    const user = await databaseService.users.findOne({ email })
    if (!user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.NOT_REGISTER
      })
    }
    checkUserVerification(user.verify)
    return true
  } catch (error) {
    throw error
  }
}

export const acceptedUsername = async (username: string) => {
  const checkEnter = containsNewline(username)
  const checkValidCharater = isValidUsername(username)
  const checkMulWhitespace = isValidMulName(username)
  if (checkEnter) {
    throw new Error(MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME)
  }
  if (!checkValidCharater) {
    throw new Error(MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME)
  }
  if (!checkMulWhitespace) {
    throw new Error(MESSAGES.VALIDATION_MESSAGES.USER.REGISTER.USERNAME_INCLUDES_MUL_WHITESPACE)
  }
  return true
}
