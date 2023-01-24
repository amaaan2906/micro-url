/**
 *
 */

import { Router } from 'express'

import validateBody from '../../middlewares/private/validateBody.js'
import createPrivateURL from '../../middlewares/private/createPrivateURL.js'

const privateAPI: Router = Router()

/**
 * Private API route to create a new short URL
 * <server>/<private_route>/create
 */
privateAPI.route('/create').post(validateBody, createPrivateURL)

/**
 * Private API route to get list of users slugs
 * <server>/<private_route>/stats
 */
privateAPI.route('/list').get()

export default privateAPI
