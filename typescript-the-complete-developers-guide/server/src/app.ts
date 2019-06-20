import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import { router as controllerRouter } from './decorators/controller'
import './auth/controller'
import { router as authRouter } from './auth/routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieSession({ keys: ['some-secret-key'] }))

app.use('/', authRouter)
app.use(controllerRouter)

app.listen(3000, () => {
  console.log('app running')
})
