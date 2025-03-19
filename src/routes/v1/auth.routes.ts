import { Router } from 'express'
import passport from 'passport'
import { UserRole } from '~/constants/enums'
import authController from '~/controllers/auth.controller'
import { requireRoleMiddleware } from '~/middlewares/auth.middleware'
import authServices from '~/services/auth.service'
import { wrapRequestHandler } from '~/utils/handler'

const authRouter = Router()
authServices.init()

/**
 * Description: Provides a list of users, often with filtering, sorting, and pagination capabilities to manage large user bases.
 * Path: /auth/
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Params: { page: number, limit: number, query: string }
 */

authRouter.get('/users', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.getAll))

/**
 * Description: Enables admins to update existing user accounts, including roles, permissions, and personal information.
 * Endpoint: /auth/users/:id
 * Methods: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Params: {id: string}
 */

authRouter.get('/users/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.get))

/**
 * Description: Enables admins to update existing user accounts, including roles, permissions, and personal information.
 * Endpoint: /auth/users/:id
 * Methods: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Params: {id: string}
 */

authRouter.put('/users/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.update))

/**
 * Description: Permits admins to delete user accounts, typically involving confirmation steps to prevent accidental deletions.
 * Endpoint: /auth/users/:id
 * Methods: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Params: {id: string}
 */

authRouter.delete('/users/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.delete))

/**
 * Description:  Allows for the get all of roles list, ensuring that users have appropriate access levels.
 * Path: /auth/roles
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * query: { includes: string }// user | admin
 */

authRouter.get('/roles', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.getRoleList))

/**
 * Description:  Allows for the modification of roles , ensuring hat users have appropriate access levels.
 * Path: /auth/roles/:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.put('/roles/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.updateRole))

/**
 * Description:  Allows for the remove of roles , ensuring hat users have appropriate access levels.
 * Path: /auth/roles/:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.delete('/roles/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.deleteRole))

/**
 * Description: Initiates a password reset process for admins, typically involving sending a reset link to the admin's registered email.
 * Endpoint: /auth/password/reset
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */

authRouter.post('/password/reset', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.restPasswordByAdmin))

authRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }))

authRouter.get('/google/callback', passport.authenticate('google', { session: false, successRedirect: 'http://localhost:3000/', failureRedirect: '/login' }))

authRouter.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['profile'] }))

authRouter.get('/facebook/callback', passport.authenticate('facebook', { session: false, successRedirect: 'http://localhost:3000/', failureRedirect: '/login' }))

authRouter.get('/github', passport.authenticate('github', { session: false, scope: ['profile'] }))

authRouter.get('/github/callback', passport.authenticate('github', { session: false, successRedirect: 'http://localhost:3000/', failureRedirect: '/login' }))

export default authRouter
