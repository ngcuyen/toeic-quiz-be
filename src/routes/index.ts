import { Router } from 'express'
import userRouter from './v1/users.routes'
import imageRouter from './v1/images.routes'
import authRouter from './v1/auth.routes'
import uploadRouter from './v1/uploads.routes'
import questionRouter from '~/routes/v1/question.routes'
import categoryRouter from '~/routes/v1/category.routes'
import paragraphRouter from '~/routes/v1/paragraph.route'
import blankRouter from '~/routes/v1/blank.routes'
import examRouter from '~/routes/v1/exam.routes'
import examQuestionRouter from '~/routes/v1/examQuestion.routes'

const rootRouter = Router()

rootRouter.use('/v1/auth', authRouter)
rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/images', imageRouter)
rootRouter.use('/v1/uploads', uploadRouter)
rootRouter.use('/v1/questions', questionRouter)
rootRouter.use('/v1/categories', categoryRouter)
rootRouter.use('/v1/paragraphs', paragraphRouter)
rootRouter.use('/v1/blanks', blankRouter)
rootRouter.use('/v1/exams', examRouter)
rootRouter.use('/v1/exam-questions', examQuestionRouter)

export default rootRouter
