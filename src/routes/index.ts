import { Router } from 'express'
import userRouter from './v1/users.routes'
import commentsRouter from './v1/comments.routes'
import hagtagsRouter from './v1/hagtags.routes'
import imageRouter from './v1/images.routes'
import authRouter from './v1/auth.routes'
import bugRouter from './v1/bugs.routes'
import solutionRouter from './v1/solutions.routes'
import uploadRouter from './v1/uploads.routes'

const rootRouter = Router()

rootRouter.use('/v1/auth', authRouter)
rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/comments', commentsRouter)
rootRouter.use('/v1/banners', commentsRouter)
rootRouter.use('/v1/hagtags', hagtagsRouter)
rootRouter.use('/v1/images', imageRouter)
rootRouter.use('/v1/bugs', bugRouter)
rootRouter.use('/v1/solutions', solutionRouter)
rootRouter.use('/v1/uploads', uploadRouter)

export default rootRouter
