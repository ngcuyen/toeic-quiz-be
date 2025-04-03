import { Router } from 'express'
import paragraphController from '~/controllers/paragraph.controller'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { paragraphValidator } from '~/middlewares/paragraph.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const paragraphRouter = Router()
paragraphRouter.post('/', paragraphValidator, wrapRequestHandler(paragraphController.create))
paragraphRouter.get('/', wrapRequestHandler(paragraphController.getAll))
paragraphRouter.get('/:id', idParamValidator, wrapRequestHandler(paragraphController.getOne))
paragraphRouter.put('/:id', idParamValidator, paragraphValidator, wrapRequestHandler(paragraphController.update))
paragraphRouter.delete('/:id', idParamValidator, wrapRequestHandler(paragraphController.delete))

export default paragraphRouter
