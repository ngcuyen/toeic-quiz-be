import { Router } from 'express'
import questionController from '~/controllers/question.controller'
import { checkIdParamValidator, questionValidator } from '~/middlewares/question.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const questionRouter = Router()
questionRouter.post('/', questionValidator, wrapRequestHandler(questionController.create))
questionRouter.get('/', wrapRequestHandler(questionController.getAll))
questionRouter.get('/:id', checkIdParamValidator, wrapRequestHandler(questionController.getOne))
questionRouter.put('/:id', checkIdParamValidator, questionValidator, wrapRequestHandler(questionController.update))
questionRouter.delete('/:id', checkIdParamValidator, wrapRequestHandler(questionController.delete))

export default questionRouter
