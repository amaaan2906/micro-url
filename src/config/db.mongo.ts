/**
 * MongoDB connection using mongoose
 */

import mongoose, { connect } from 'mongoose'

let mongoURI: any

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
  mongoURI = process.env.MONGO_DEV
} else {
  mongoURI = process.env.MONGO_URI
}

mongoose.Promise = global.Promise

mongoose.set('strictQuery', true)

export default connect(mongoURI, () => console.log(`[server] Connected to db!`))
