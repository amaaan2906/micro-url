/**
 * Get URL stats middleware for public endpoint
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
  try {
    const slug = req.query.slug
    if (typeof slug === 'undefined') throw new Error('Slug query not present')
    console.log(`[public] Retrieving stats for '/${req.query.slug}'`)
    const exists = await urlModel.findOne({
      slug: req.query.slug,
      createdBy: 'public',
    })
    if (exists) {
      const result = JSON.parse(JSON.stringify(exists))
      delete result._id
      delete result.__v
      delete result.createdBy
      res.json(result)
    } else throw new Error(`'/${slug}' is invalid or private`)
  } catch (e: any) {
    next(e)
  }
}
