import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import examController from '~/controllers/exam.controller'
import { requireLoginMiddleware, requireRoleMiddleware } from '~/middlewares/auth.middleware'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { examValidator } from '~/middlewares/exam.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const examRouter = Router()

//create exam by user
examRouter.post('/', wrapRequestHandler(requireLoginMiddleware), examValidator, wrapRequestHandler(examController.create))
//get all exams by admin
examRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(examController.getAll))
//get exam by id by user
examRouter.get('/:id', wrapRequestHandler(requireLoginMiddleware), idParamValidator, wrapRequestHandler(examController.getOne))
//update exam by id by admin
examRouter.put('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), idParamValidator, examValidator, wrapRequestHandler(examController.update))
//delete exam by id by admin
examRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), idParamValidator, wrapRequestHandler(examController.delete))
//create random exam by user
examRouter.post('/random', wrapRequestHandler(requireLoginMiddleware), wrapRequestHandler(examController.createRandomExam))

export default examRouter
