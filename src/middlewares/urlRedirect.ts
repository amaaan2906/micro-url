/**
 * Middleware to redirect long url corresponding to slug
 */

import { Request, Response, NextFunction } from 'express'

import config from '../config/config.js'

const DATABASE = config.database_type
const { getRedirect } = await import(`../db/controller/url.${DATABASE}.js`)

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const longURL = await getRedirect({ slug: req.params.slug })
    console.log(longURL)
    res.redirect(longURL.url)
  } catch (e: any) {
    next(e)
  }
}
