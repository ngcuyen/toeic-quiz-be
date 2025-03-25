import { Router } from 'express'
import userRouter from './v1/users.routes'
import imageRouter from './v1/images.routes'
import authRouter from './v1/auth.routes'
import uploadRouter from './v1/uploads.routes'

const rootRouter = Router()

rootRouter.use('/v1/auth', authRouter)
rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/images', imageRouter)
rootRouter.use('/v1/uploads', uploadRouter)

export default rootRouter
