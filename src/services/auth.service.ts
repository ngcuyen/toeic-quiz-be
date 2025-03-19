import { StatusCodes } from 'http-status-codes'
import _ from 'lodash'
import { ObjectId } from 'mongodb'
import passport from 'passport'
import { MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import User from '~/models/schemas/Users.schema'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GithubStrategy } from 'passport-github2'
import { env } from '~/config/environment.config'
import { AuthProvider, QueryType } from '~/@types/auth.type'
import { Request } from 'express'
import userServices from './users.service'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { NOTFOUND } from 'dns'
import { databaseService } from '~/services/connectDB.service'

class AuthService {
  async validateWithIDAccountAccessibility(id: string): Promise<boolean> {
    const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
    if (!user || ['Unverified', 'Banned'].includes(user.verify)) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.FORBIDDEN,
        message: user
          ? user.verify === 'Unverified'
            ? MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED
            : MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
          : MESSAGES.VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_NOT_FOUND
      })
    }
    return true
  }

  init() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.oauth2.google.client_id,
          clientSecret: env.oauth2.google.client_secret,
          callbackURL: env.oauth2.google.callback_url,
          passReqToCallback: true,
          scope: ['profile', 'email']
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'google', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                username: profile._json.name,
                email: profile._json.email,
                provider: 'google',
                providerId: profile.id
              })
              const result = await databaseService.users.insertOne(newUser)
              req.user = {
                ...newUser,
                _id: result.insertedId.toString()
              }
              return done(null, newUser)
            }
            req.user = { ...user, _id: user._id.toString() }
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
    passport.use(
      new FacebookStrategy(
        {
          clientID: env.oauth2.facebook.client_id,
          clientSecret: env.oauth2.facebook.client_secret,
          callbackURL: env.oauth2.facebook.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'facebook', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                // @ts-ignore
                email: profile.email,
                username: profile.displayName,
                provider: 'facebook',
                providerId: profile.id
              })
              const result = await databaseService.users.insertOne(newUser)

              req.user = {
                ...newUser,
                _id: result.insertedId.toString()
              }
              return done(null, newUser)
            }
            req.user = { ...user, _id: user._id.toString() }
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
    passport.use(
      new GithubStrategy(
        {
          clientID: env.oauth2.github.client_id,
          clientSecret: env.oauth2.github.client_secret,
          callbackURL: env.oauth2.github.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'github', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                username: profile.login,
                email: profile.email,
                provider: 'github',
                providerId: profile.id
              })
              await databaseService.users.insertOne(newUser)
              req.user = newUser
              return done(null, newUser)
            }
            req.user = user
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
  }

  async callback(provider: AuthProvider, req: Request, res: Response) {
    const { _id, role, email, username } = req.user
    const refresh_token = await userServices.signRefreshToken(_id.toString(), email, username, role)
    // if user is logged in but still login again
    await databaseService.refreshTokens.deleteOne({ user_id: new ObjectId(_id) })
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(_id)
      })
    )
  }

  async getAllUser(payload: QueryType) {
    const page = parseInt(payload.page) || 1
    const limit = parseInt(payload.limit) || 10
    const totalCount = await databaseService.users.countDocuments({ _destroy: false })
    if (totalCount === 0) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: MESSAGES.ERROR_MESSAGES.USER_SPECIFIC.NOT_FOUND
      })
    }

    const pagenumber = totalCount / limit
    const skip = (page - 1) * limit
    const data = await databaseService.users.find({ _destroy: false }).limit(limit).skip(skip).toArray()
    const items = data.map((item) => _.omit(item, ['password']))
    return {
      items: items,
      totalItems: totalCount,
      itemsPerPage: limit,
      totalPages: Math.ceil(pagenumber),
      currentPage: page
    }
  }
}
const authServices = new AuthService()
export default authServices
