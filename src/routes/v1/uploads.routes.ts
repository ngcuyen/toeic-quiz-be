import { Router } from 'express'
import uploadController from '~/controllers/upload.controller'
import { uploadMiddleware } from '~/middlewares/upload.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const uploadRouter = Router()

uploadRouter.post('/bug', uploadMiddleware, wrapRequestHandler(uploadController.bugs))
uploadRouter.post('/solution', uploadMiddleware, wrapRequestHandler(uploadController.solutions))

export default uploadRouter
