import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import { AppRouter } from './routing'

import './routing/controller'
import './auth/controller'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieSession({ keys: ['some-secret-key'] }))
app.use(AppRouter.getInstance())

app.listen(3000, () => {
  console.log('app running')
})
