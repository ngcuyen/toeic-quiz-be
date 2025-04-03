import { Router } from 'express'
import categoryController from '~/controllers/category.controller'
import { categoryValidator } from '~/middlewares/category.middleware'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const categoryRouter = Router()
categoryRouter.post('/', categoryValidator, wrapRequestHandler(categoryController.create))
categoryRouter.get('/', wrapRequestHandler(categoryController.getAll))
categoryRouter.get('/:id', idParamValidator, wrapRequestHandler(categoryController.getOne))
categoryRouter.put('/:id', idParamValidator, categoryValidator, wrapRequestHandler(categoryController.update))
categoryRouter.delete('/:id', idParamValidator, wrapRequestHandler(categoryController.delete))

export default categoryRouter
