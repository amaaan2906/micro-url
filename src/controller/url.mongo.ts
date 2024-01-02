import '../config/db.mongo.js'
import { urlModel } from '../models/url.mongo.js'

import rs from 'randomstring'

interface Response {
  slugChange: boolean
}

interface Options {
  url: string
  slug: string
}

export async function createURL(type = 'public', options: Options) {
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
