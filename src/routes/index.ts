/**
 *
 */

import { Router, Request, Response, ErrorRequestHandler } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const routes: Router = Router()

// Server Health
routes.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200)
})

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
console.log(
  `[server] Private route registered on '${process.env.PRIVATE_ROUTE}'`
)
routes.use(`/${process.env.PRIVATE_ROUTE}/`, privateAPI)

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
