/**
 * Create URL middleware for public endpoint
 */

import { Request, Response, NextFunction } from 'express'
import rs from 'randomstring'

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
  console.log(`[public] Shortening '${req.body.url}'`)
  try {
    let slug: string
    do {
      slug = rs.generate({
        length: 6,
        readable: true,
      } as rs.GenerateOptions)
    } while (await urlModel.findOne({ slug: slug }))
    const newPublic = new urlModel({
      url: req.body.url,
      slug: slug,
      createdBy: 'public',
    })
    const save = await newPublic.save()
    return res.json(save)
  } catch (e: any) {
    next(e)
  }
}
