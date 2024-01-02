/**
 * Create URL middleware for private endpoint
 */

import { Request, Response, NextFunction } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_CONTROLLER = `../../controller/url.${DATABASE}.js`
const { createURL } = await import(DB_CONTROLLER)

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(
      createURL('private', {
        url: req.body.url,
        slug: req.body.slug,
      })
    )
  } catch (e: any) {
    next(e)
  }
}
