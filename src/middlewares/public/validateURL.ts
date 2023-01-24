import { Request, Response, NextFunction } from 'express'

import { validatePublic } from '../../helper/validateURL.js'

export default (req: Request, res: Response, next: NextFunction) => {
  const url = req.body.url
  try {
    validatePublic.validateSync(
      {
        url: url,
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
