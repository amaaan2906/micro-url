/**
 * Get stats middleware
 */

import { Request, Response, NextFunction } from 'express'

import config from '../config/config.js'

const DATABASE = config.database_type
const { getStats } = await import(`../db/controller/url.${DATABASE}.js`)

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
