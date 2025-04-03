import { Router } from 'express'
import questionController from '~/controllers/question.controller'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { questionValidator } from '~/middlewares/question.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const questionRouter = Router()
questionRouter.post('/', questionValidator, wrapRequestHandler(questionController.create))
questionRouter.get('/', wrapRequestHandler(questionController.getAll))
questionRouter.get('/:id', idParamValidator, wrapRequestHandler(questionController.getOne))
questionRouter.put('/:id', idParamValidator, questionValidator, wrapRequestHandler(questionController.update))
questionRouter.delete('/:id', idParamValidator, wrapRequestHandler(questionController.delete))

export default questionRouter
