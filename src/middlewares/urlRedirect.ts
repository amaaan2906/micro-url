/**
 * Middleware to redirect long url corresponding to slug
 */

import { Request, Response, NextFunction } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_CONTROLLER = `../controller/url.${DATABASE}.js`
const { getRedirect } = await import(DB_CONTROLLER)

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const longURL = await getRedirect({ slug: req.params.slug })
    console.log(longURL)
    res.redirect(longURL.url)
  } catch (e: any) {
    next(e)
  }
}
