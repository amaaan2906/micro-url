import express, { Express } from 'express'
import morgan from 'morgan'

const app: Express = express()

/* Middlewares */
app.use(express.json())
app.use(morgan('common'))
app.use(
  express.urlencoded({
    extended: true,
  })
)

/* Router */
import routes from './routes/index.js'
app.use('/', routes)

// Run app
const PORT: string | number = process.env.PORT || 2906
app.listen(PORT, () => {
  console.log('[server] Service is live on ' + PORT)
})
