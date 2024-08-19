import express, { Express } from 'express'
import morgan from 'morgan'

import { expressDevLogger } from './utils/logger.dev.js'
import config from './config/config.js'

const app: Express = express()

/* Middlewares */
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

/* Loggers */
if (config.morgan) app.use(morgan('common'))
if (config.dev_logger) app.use(expressDevLogger)

/* Router */
import routes from './routes/index.js'
app.use('/', routes)

// Run app
const PORT: string | number = config.port || 1337

const server: any = app.listen(PORT, () => {
  console.log('[app] Service is live on ' + server.address().port)
  if (process.env.APP_ENV != 'prod')
    console.log('[app]', process.env.APP_ENV, 'config', config)
})
