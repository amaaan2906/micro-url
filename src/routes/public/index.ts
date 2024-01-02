/**
 *
 */

import { Router, Request, Response } from 'express'

import { publicValidate } from '../../middlewares/validateCreate.js'
import { publicCreate } from '../../middlewares/createURL.js'
import { publicStats } from '../../middlewares/getStats.js'

const publicAPI: Router = Router()

/**
 * Public API route to create a new short URL
 * <server>/api/create
 */
publicAPI
  .route('/create')
  .get((req: Request, res: Response) => {
    res.status(200).json({
      route: '/api/create',
      method: 'POST',
      body: JSON.parse(
        '{ "url": "long link" , "format": "return object format (json(d), txt, xml)" }'
      ),
      header: '',
    })
  })
  .post(publicValidate, publicCreate)

/**
 * Public API route to get stats for a short URL
 * <server>/api/stats?slug=<short url>
 */
publicAPI.route('/stats').get(publicStats)

export default publicAPI
