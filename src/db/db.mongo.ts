/**
 * MongoDB connection using mongoose
 */

import mongoose, { connect } from 'mongoose'
// import { MongoMemoryServer } from 'mongodb-memory-server'

import config from '../config/config.js'

mongoose.Promise = global.Promise

mongoose.set('strictQuery', true)

export default connect(config.mongo_uri, () =>
  console.log(`[database] Connected to db!`)
)

class MongoConnection {
  private static _instance: MongoConnection
}
