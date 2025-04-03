import { Router } from 'express'
import examQuestionController from '~/controllers/examQuestion.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middleware'
import { idParamValidator } from '~/middlewares/commons.middleware'
import { examQuestionValidator } from '~/middlewares/examQuestion.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const examQuestionRouter = Router()

//create exam by user
examQuestionRouter.post('/', wrapRequestHandler(requireLoginMiddleware), examQuestionValidator, wrapRequestHandler(examQuestionController.create))
//get all exams by admin
examQuestionRouter.get('/', wrapRequestHandler(requireLoginMiddleware), wrapRequestHandler(examQuestionController.getAll))
//get exam by id by user
examQuestionRouter.get('/:id', wrapRequestHandler(requireLoginMiddleware), idParamValidator, wrapRequestHandler(examQuestionController.getOne))
//update exam by id by admin
// examQuestionRouter.put('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), idParamValidator, examValidator, wrapRequestHandler(examQuestionController.update))
//delete exam by id by admin
// examQuestionRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), idParamValidator, wrapRequestHandler(examQuestionController.delete))

export default examQuestionRouter
