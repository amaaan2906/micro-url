/**
 * Create URL middlewares
 */

import { Request, Response, NextFunction } from 'express'

import config from '../config/config.js'

const DATABASE = config.database_type
const { createURL } = await import(`../db/controller/url.${DATABASE}.js`)

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
