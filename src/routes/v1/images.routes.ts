import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import imageController from '~/controllers/image.controller'
import { requireRoleMiddleware } from '~/middlewares/auth.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const imageRouter = Router()

/**
 * Description:  This endpoint allows a client to upload a single image to the server. The image is expected to be part of the request's body, typically encoded as multipart/form-data, which allows binary files to be transmitted along with other form data.
 * Purpose: Upload single image
 * Path: /images/upload/single
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * body: {page: number, limit: number, folder_name: string, sort_by: created_at}
 */

imageRouter.get('', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(imageController.getAll))

/**
 * Description:  This endpoint allows a client to upload a single image to the server. The image is expected to be part of the request's body, typically encoded as multipart/form-data, which allows binary files to be transmitted along with other form data.
 * Purpose: Upload single image
 * Path: /images/upload/single
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

imageRouter.post('/upload/single', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(imageController.uploadSingle))

/**
 * Description: This endpoint enables clients to upload multiple images in a single request. Similar to the single image upload, this uses multipart/form-data encoding but expects multiple image files within the request.
 * Purpose: Upload multiple image
 * Path: /images/upload/multiple
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

imageRouter.post('/upload/multiple', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(imageController.uploadMultiple))

/**
 * Description: Clear all image from the server. This action often requires appropriate permissions to ensure that users can only delete images they own or have explicit rights to manage. The deletion might be permanent, or the system might support a way to recover deleted images within a certain timeframe.
 * Purpose: Removes an image from the server.
 * Path: /images/clear
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

imageRouter.post('/clear', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(imageController.clear))

export default imageRouter
