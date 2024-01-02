/**
 * Validation check middleware for create endpoints
 */

import { Request, Response, NextFunction } from 'express'

import { validatePublic, validatePrivate } from '../helper/validateCreateURL.js'

export function publicValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validatePublic.validateSync(
      {
        url: req.body.url,
      },
      {
        abortEarly: true,
      }
    )
  } catch (e: any) {
    throw new TypeError(e.errors)
  }
  next()
}

export function privateValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validatePrivate.validateSync(
      {
        url: req.body.url,
        slug: req.body.slug,
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
