import { Router } from 'express'
import blankController from '~/controllers/blank.controller'
import { blankValidator } from '~/middlewares/blank.middleware'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const blankRouter = Router()

blankRouter.post('/', blankValidator, wrapRequestHandler(blankController.create))
blankRouter.get('/', wrapRequestHandler(blankController.getAll))
blankRouter.get('/:id', idParamValidator, wrapRequestHandler(blankController.getOne))
blankRouter.put('/:id', idParamValidator, blankValidator, wrapRequestHandler(blankController.update))
blankRouter.delete('/:id', idParamValidator, wrapRequestHandler(blankController.delete))

export default blankRouter
