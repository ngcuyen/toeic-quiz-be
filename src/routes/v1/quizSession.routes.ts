import { Router } from 'express'
import quizSessionController from '~/controllers/quizSession.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middleware'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { quizSessionValidator, submitTestValidator } from '~/middlewares/quizSession.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const quizSessionRouter = Router()
quizSessionRouter.post('/', quizSessionValidator, wrapRequestHandler(quizSessionController.create))
quizSessionRouter.get('/', wrapRequestHandler(quizSessionController.getAll))
quizSessionRouter.get('/:id', idParamValidator, wrapRequestHandler(quizSessionController.getOne))
quizSessionRouter.put('/:id', wrapRequestHandler(requireLoginMiddleware), idParamValidator, submitTestValidator, wrapRequestHandler(quizSessionController.submitTest))
quizSessionRouter.delete('/:id', wrapRequestHandler(requireLoginMiddleware), idParamValidator, wrapRequestHandler(quizSessionController.delete))

export default quizSessionRouter
