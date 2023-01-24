/**
 *
 */

import { Router, Request, Response } from 'express'

import validateURL from '../../middlewares/public/validateURL.js'
import createPublicURL from '../../middlewares/public/createPublicURL.js'
import getStats from '../../middlewares/public/getStats.js'

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
  .post(validateURL, createPublicURL)

/**
 * Public API route to get stats for a short URL
 * <server>/api/stats?slug=<short url>
 */
publicAPI.route('/stats').get(getStats)

export default publicAPI
