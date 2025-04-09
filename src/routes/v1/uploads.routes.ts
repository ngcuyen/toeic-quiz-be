import { Router } from 'express'
import uploadController from '~/controllers/upload.controller'
import { uploadMiddleware } from '~/middlewares/upload.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const uploadRouter = Router()

uploadRouter.post('/', uploadMiddleware, wrapRequestHandler(uploadController.upload))

export default uploadRouter
