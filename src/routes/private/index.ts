/**
 *
 */

import { Router } from 'express'

import { privateValidate } from '../../middlewares/validateCreate.js'
import { privateCreate } from '../../middlewares/createURL.js'

const privateAPI: Router = Router()

/**
 * Private API route to create a new short URL
 * <server>/<private_route>/create
 */
privateAPI.route('/create').post(privateValidate, privateCreate)

/**
 * Private API route to get list of users slugs
 * <server>/<private_route>/stats
 */
privateAPI.route('/list').get()

export default privateAPI
