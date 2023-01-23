/**
 *
 */

import { Router, Request, Response } from 'express'

const routes: Router = Router()

// Server Health
routes.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200)
})

/**
 *  [ ] account system
 *    - auth system
 *    - cookie management
 *    -
 *  [ ] url management system
 *    - create short url with custom slug
 *    - view stats for public slug
 *  */

// public url api
import publicAPI from './public/api.js'
routes.use('/api', publicAPI)

// internal api

// pro user api

export default routes
