import { Request, Response, NextFunction } from 'express'
import rs from 'randomstring'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const MODEL_IMPORT = `../../models/url.${DATABASE}.js`
const { urlModel } = await import(MODEL_IMPORT)

import { validatePrivate } from '../../helper/validateURL.js'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let slug = req.body.slug
    while (
      (await urlModel.findOne({ slug: slug })) ||
      typeof slug === 'undefined'
    ) {
      console.log(`[private] Generating slug for '${req.body.url}'`)
      slug = rs.generate({
        length: 6,
        readable: true,
      } as rs.GenerateOptions)
    }
    req.body.slug = slug
    validatePrivate.validateSync(
      {
        url: req.body.url,
        slug: slug,
      },
      {
        abortEarly: true,
      }
    )
  } catch (e: any) {
    next(e)
  }
  next()
}
