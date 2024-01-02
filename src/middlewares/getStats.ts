/**
 * Get stats middleware
 */

import { Request, Response, NextFunction } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_CONTROLLER = `../controller/url.${DATABASE}.js`
const { getStats } = await import(DB_CONTROLLER)

export async function publicStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(
      await getStats('public', {
        slug: req.query.slug,
      })
    )
  } catch (e: any) {
    next(e)
  }
}
