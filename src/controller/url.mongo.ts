import '../config/db.mongo.js'
import { urlModel, urlSchema, URL } from '../models/url.mongo.js'
import { model } from 'mongoose'

import rs from 'randomstring'

interface createResponse {
  slugChange?: boolean
  url?: {
    url: string
    slug: string
    clicks: number
    createdBy: string
    _id: string
    createdDate: number
    __v: number
  }
}
interface statsResponse {}
interface createOptions {
  url: string
  slug: string
}
interface statsOptions {
  slug: string
}

export async function getStats(
  type: string = 'public',
  options: statsOptions
): Promise<any> {
  let { slug } = options
  let response: any = {}
  if (typeof slug === 'undefined' || slug == '')
    throw new Error('Slug query not present')
  console.log(`[${type}] Retrieving stats for '/${slug}'`)
  let exists
  if ((type = 'public')) {
    exists = await urlModel.findOne({
      slug: slug,
      createdBy: 'public',
    })
  } else {
    // private search
  }
  if (exists) {
    const response = JSON.parse(JSON.stringify(exists))
    delete response._id
    delete response.__v
    delete response.createdBy
    return response
  } else throw new Error(`'/${slug}' is invalid`)
}

export async function createURL(
  type: string = 'public',
  options: createOptions
): Promise<createResponse> {
  let { url, slug } = options
  let response: any = {}
  if (
    typeof slug == 'undefined' ||
    slug == '' ||
    (await urlModel.findOne({ slug: slug }))
  ) {
    /**
     * This conditional runs if the slug is undefined/empty/not unique
     * A slug is undefined for public and is optional for private
     * A unique slug is generated and the slugChange flag is updated for private user
     *
     */
    do {
      if (type == 'private') response.slugChange = true
      response.slugChange = true
      slug = rs.generate({
        length: 6,
        readable: true,
      } as rs.GenerateOptions)
    } while (await urlModel.findOne({ slug: slug }))
  }
  console.log(`[${type}] Shortening '${url}' to '/${slug}'`)
  if (type == 'public') {
    /**
     * TODO: optimize db inserts by checking for existing public entry in db and return existing slug
     */
    const newPublic = new urlModel({
      url: url,
      slug: slug,
      createdBy: 'public',
    })
    response.url = await newPublic.save()
  } else if (type == 'private') {
    const newPrivate = new urlModel({
      url: url,
      slug: slug,
      createdBy: `<account id>`,
    })
    response.url = await newPrivate.save()
  }
  return response
}
