import express from 'express'
import { env } from './config/environment.config'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rootRouter from './routes'
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware'
import { databaseService } from './services/connectDB.service'
import { defaultErrorHandler } from './middlewares/errors.middleware'
import exitHook from 'async-exit-hook'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { MESSAGES } from './constants/message'
import passport from 'passport'
import authServices from './services/auth.service'

const app = express()

app.use(compression())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.static('.'))
app.use(passport.initialize())

authServices.init()

// Rate limit request from client
if (env.node_env === 'production') {
  app.use('/api', rateLimiterMiddleware)
}
app.use('/api', rootRouter)

//Connect Database Code Arena
databaseService.connect()

// Error handling
app.use(defaultErrorHandler)

app.listen(env.server.port, env.server.host, () => {
  console.log(`🚀 Server Running On Port ${env.server.port}`)
})
// Close db and close db_logs
exitHook(() => {
  databaseService.disConnect()
  console.log(MESSAGES.DATABASE.DISCONNECT_SUCCESS)
})

export default app
