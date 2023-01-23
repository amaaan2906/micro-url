/**
 * Model describing the URL data stored in MongoDB.
 */

import { Document, Schema, model } from 'mongoose'

interface URL extends Document {
  url: string
  slug: string
  createdDate: number
  clicks: number
  createdBy: string
}

const urlSchema: Schema = new Schema<URL>({
  url: {
    // long url
    type: String,
    required: true,
  },
  slug: {
    // short url
    type: String,
    required: true,
  },
  createdDate: {
    // created dated
    type: Number,
    default: Date.now,
  },
  clicks: {
    // number of clicks on link
    type: Number,
    default: 0,
  },
  createdBy: {
    // created by user or public
    type: String,
    required: true,
    default: 'public',
  },
})

export const urlModel = model<URL>('url', urlSchema)
export { urlSchema }
