import dotenv from 'dotenv'
import Joi from 'joi'
import { MESSAGES } from '~/constants/message'

dotenv.config()

let { PORT, HOST, DEV } = MESSAGES.ENVIRONMENT
let { DATABASE, CLOUDINARY, AUTH } = MESSAGES
let { POINT, DURATION, PASSWORD_SECRET, COOKIE_EXPIRATION, SECRET_COOKIE_NAME, SERVER_URL, PATHS } = MESSAGES.CLIENT.REQUEST
let { ALGORITHM, EXPIRATION, OTP_SECRET, REFRESH_TOKEN_KEY, SECRET_KEY } = MESSAGES.AUTH.JWT
let { OTP } = MESSAGES.AUTH

const envSchema = Joi.object({
  APP_PORT: Joi.number().required().description(PORT),
  APP_HOST: Joi.string().required().description(HOST),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_NAME: Joi.string().required().description(DEV),
  SERVER_URL: Joi.string().required().description(SERVER_URL),

  DB_USER_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.USERS),
  DB_REFRESH_TOKEN_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.REFRESH_TOKENS),
  DB_OTP_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.OTP),
  DB_LIKES_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.LIKES),
  DB_BLOGS_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.BLOGS),
  DB_TAGS_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.TAGS),
  DB_COMMENT_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.COMMENTS),
  DB_BOOKMARKS_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.BOOKMARKS),
  DB_BUGS_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.BUGS),
  DB_SOLUTIONS_COLLECTION: Joi.string().required().description(DATABASE.COLLECTIONS.SOLUTIONS),

  DATABASE_HUTECH_BUG: Joi.string().required().description(DATABASE.USERNAME),
  PASSWORD_HUTECH_BUG: Joi.string().required().description(DATABASE.PASSWORD),

  RATE_POINT: Joi.number().required().description(POINT),
  RATE_DURATION: Joi.number().required().description(DURATION),
  PASSWORD_SECRET: Joi.string().required().description(PASSWORD_SECRET),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required().description(SECRET_KEY),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required().description(REFRESH_TOKEN_KEY),
  JWT_ALGORITHM: Joi.string().required().description(ALGORITHM),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required().description(EXPIRATION.ACCESS_TOKEN),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required().description(EXPIRATION.REFRESH_TOKEN),
  COOKIES_EXPIRESIN: Joi.number().required().description(COOKIE_EXPIRATION),
  SECRET_COOKIE_NAME: Joi.string().required().description(SECRET_COOKIE_NAME),

  OTP_SECRET: Joi.string().required().description(OTP_SECRET),
  OTP_EMAIL: Joi.string().required().description(OTP.ACCOUNT),
  OTP_EMAIL_PASSWORD: Joi.string().required().description(OTP.PASSWORD),
  OTP_EMAIL_NAME: Joi.string().required().description(OTP.NAME),

  CLOUDINARY_KEY: Joi.string().required().description(CLOUDINARY.KEY),
  CLOUDINARY_SECRET: Joi.string().required().description(CLOUDINARY.SECRET),
  CLOUDINARY_NAME: Joi.string().required().description(CLOUDINARY.NAME),
  CLOUDINARY_AVATAR_FOLDER: Joi.string().required().description(CLOUDINARY.AVATAR_FOLDER),
  CLOUDINARY_BUGS_FOLDER: Joi.string().required().description(CLOUDINARY.BUGS_FOLDER),
  CLOUDINARY_SOLUTIONS_FOLDER: Joi.string().required().description(CLOUDINARY.SOLUTIONS_FOLDER),

  HASH_SALT_ROUNDS: Joi.number().required(),

  OPENAPI_YAML_PATH: Joi.string().required().description(PATHS.OPENAPI_YAML),

  GOOGLE_CLIENT_ID: Joi.string().required().description(AUTH.OAUTH2.GOOGLE_CLIENT_ID),
  GOOGLE_CLIENT_SECRET: Joi.string().required().description(AUTH.OAUTH2.GOOGLE_CLIENT_SECRET),
  GOOGLE_CALLBACK: Joi.string().required().description(AUTH.OAUTH2.GOOGLE_CALLBACK),
  FACEBOOK_APP_ID: Joi.string().required().description(AUTH.OAUTH2.FACEBOOK_APP_ID),
  FACEBOOK_APP_SECRET: Joi.string().required().description(AUTH.OAUTH2.FACEBOOK_APP_SECRET),
  FACEBOOK_CALLBACK: Joi.string().required().description(AUTH.OAUTH2.FACEBOOK_CALLBACK),
  GITHUB_CLIENT_ID: Joi.string().required().description(AUTH.OAUTH2.GITHUB_CLIENT_ID),
  GITHUB_CLIENT_SECRET: Joi.string().required().description(AUTH.OAUTH2.GITHUB_CLIENT_SECRET),
  GITHUB_CALLBACK: Joi.string().required().description(AUTH.OAUTH2.GITHUB_CALLBACK)
})
  .unknown()
  .required()

// Validate the environment variables
const { error, value: envVars } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const env = {
  node_env: envVars.NODE_ENV,
  client: {
    cookies_name: envVars.SECRET_COOKIE_NAME,
    cookies_exp: envVars.COOKIES_EXPIRESIN
  },
  server: {
    port: envVars.APP_PORT || 5000,
    host: envVars.APP_HOST,
    rate_point: envVars.RATE_POINT,
    rate_duration: envVars.RATE_POINT,
    password_secret: envVars.PASSWORD_SECRET,
    otp_secret: envVars.OTP_SECRET,
    url: envVars.SERVER_URL
  },
  database: {
    main: {
      url: `mongodb+srv://${envVars.DATABASE_HUTECH_BUG}:${envVars.PASSWORD_HUTECH_BUG}@bug-management.2kbota8.mongodb.net/?retryWrites=true&w=majority&appName=bug-management`,
      name: envVars.DB_NAME,
      collection: {
        users: envVars.DB_USER_COLLECTION,
        refresh_tokens: envVars.DB_REFRESH_TOKEN_COLLECTION,
        otps: envVars.DB_OTP_COLLECTION,
        likes: envVars.DB_LIKES_COLLECTION,
        blogs: envVars.DB_BLOGS_COLLECTION,
        tags: envVars.DB_TAGS_COLLECTION,
        comments: envVars.DB_COMMENT_COLLECTION,
        bookmarks: envVars.DB_BOOKMARKS_COLLECTION,
        bugs: envVars.DB_BUGS_COLLECTION,
        solutions: envVars.DB_SOLUTIONS_COLLECTION
      }
    }
  },
  jwt: {
    secret_key: envVars.JWT_ACCESS_TOKEN_SECRET,
    access_token_exp: envVars.ACCESS_TOKEN_EXPIRESIN,
    refresh_token_key: envVars.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_exp: envVars.REFRESH_TOKEN_EXPIRESIN,
    jwt_algorithm: envVars.JWT_ALGORITHM
  },
  email: {
    account: envVars.OTP_EMAIL,
    password: envVars.OTP_EMAIL_PASSWORD,
    name: envVars.OTP_EMAIL_NAME
  },
  cloudinary: {
    secret: envVars.CLOUDINARY_SECRET,
    key: envVars.CLOUDINARY_KEY,
    cloud_name: envVars.CLOUDINARY_NAME,
    avatar_folder: envVars.CLOUDINARY_AVATAR_FOLDER,
    bugs_folder: envVars.CLOUDINARY_BUGS_FOLDER,
    solutions_folder: envVars.CLOUDINARY_SOLUTIONS_FOLDER
  },
  path: {
    paths_yaml: envVars.OPENAPI_YAML_PATH
  },
  password: {
    salt_round: envVars.HASH_SALT_ROUNDS
  },
  oauth2: {
    google: {
      client_id: envVars.GOOGLE_CLIENT_ID,
      client_secret: envVars.GOOGLE_CLIENT_SECRET,
      callback_url: envVars.GOOGLE_CALLBACK
    },
    facebook: {
      client_id: envVars.FACEBOOK_APP_ID,
      client_secret: envVars.FACEBOOK_APP_SECRET,
      callback_url: envVars.FACEBOOK_CALLBACK
    },
    github: {
      client_id: envVars.GITHUB_CLIENT_ID,
      client_secret: envVars.GITHUB_CLIENT_SECRET,
      callback_url: envVars.GITHUB_CALLBACK
    }
  }
}
