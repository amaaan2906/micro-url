/**
 *
 */

import { Router, Request, Response, ErrorRequestHandler } from 'express'

import config from '../config/config.js'
import urlRedirect from '../middlewares/urlRedirect.js'

// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = await import('dotenv')
//   dotenv.config()
// }

const routes: Router = Router()

// Server Health
routes.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200)
})

// 404 route
routes.get('/404', (req: Request, res: Response) => {
  res.sendStatus(404)
})

// short url redirect
routes.route('/:slug').get(urlRedirect)

/**
 *  [ ] account system
 *    - auth system
 *    - cookie management
 *
 *  [ ] url management system
 *    x create short url (public)
 *    x create short url with custom slug (private)
 *    x view stats for public slug
 *    - view private url list and stats
 *  */

// public url api
import publicAPI from './public/index.js'
routes.use('/api/', publicAPI)

// pro user private api
import privateAPI from './private/index.js'
console.log(`[router] Private route registered on '${config.private_route}'`)

routes.use(`/${config.private_route}/`, privateAPI)

// error handling
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.status) res.status(error.status)
  else res.status(500)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '☠' : error.stack,
  })
}
routes.use(errorHandler)

export default routes
