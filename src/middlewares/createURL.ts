/**
 * Create URL middlewares
 */

import { Request, Response, NextFunction } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_CONTROLLER = `../controller/url.${DATABASE}.js`
const { createURL } = await import(DB_CONTROLLER)

export async function publicCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await createURL('public', { url: req.body.url }))
  } catch (e: any) {
    next(e)
  }
}

export async function privateCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(
      await createURL('private', {
        url: req.body.url,
        slug: req.body.slug,
      })
    )
  } catch (e: any) {
    next(e)
  }
}
