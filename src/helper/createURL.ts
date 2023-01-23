/**
 *
 */

import rs from 'randomstring'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

const DATABASE = process.env.DATABASE_TYPE
const DB_IMPORT = `../config/db.${DATABASE}.js`
const MODEL_IMPORT = `../models/url.${DATABASE}.js`

const db = await import(DB_IMPORT)
const { urlModel } = await import(MODEL_IMPORT)

import { createBody, returnURL } from '../interface/createURL.js'
import { validatePublic } from '../helper/validateURL.js'

export function createPublic(options: createBody): returnURL {
  try {
    validatePublic.validateSync(
      {
        url: options.url,
      },
      {
        abortEarly: true,
      }
    )
  } catch (e: any) {
    return {
      status: 400,
      res: {
        url: options.url,
        error: e.errors,
      },
    }
  }

  console.log(`[/api/create] Public create for ${options.url}`)
  // do {
  const slug: string = rs.generate({
    length: 6,
    readable: true,
  } as rs.GenerateOptions)
  // } while (true)
  const newURL = new urlModel({
    url: options.url,
    slug: slug,
    createdBy: 'public',
  })
  return {
    status: 200,
    res: {
      url: options.url,
      slug: slug,
    },
  }
}

export function createPrivate() {
  return 0
}
