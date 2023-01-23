/**
 *
 */

import { Router, Request, Response } from 'express'

import { createBody } from '../../interface/createURL.js'
import { createPublic } from '../../helper/createURL.js'

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
  .post(async (req: Request, res: Response) => {
    const body: createBody = { ...req.body }
    const result = createPublic(body)
    res.status(result.status).json(result.res)
  })

export default publicAPI
