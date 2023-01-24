/**
 * Create URL middleware for private endpoint
 */

import { Request, Response, NextFunction } from 'express'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_IMPORT = `../../config/db.${DATABASE}.js`
const MODEL_IMPORT = `../../models/url.${DATABASE}.js`

await import(DB_IMPORT)
const { urlModel } = await import(MODEL_IMPORT)

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[private] Shortening '${req.body.url}' to '/${req.body.slug}'`)
  try {
    const newPrivate = new urlModel({
      url: req.body.url,
      slug: req.body.slug,
      createdBy: `<account id>`,
    })
    const save = await newPrivate.save()
    return res.json(save)
  } catch (e: any) {
    next(e)
  }
}
