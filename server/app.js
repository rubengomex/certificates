const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const responseTime = require('response-time')
const cookieSession = require('cookie-session')
const passport = require('passport')
const config = require('configuration')
const database = require('database')
const router = require('routing')
const app = require('express')()
const port = config.get('PORT')
const env = config.get('ENV')

// Ensures that User collection is created when we boot the app
require('api/users/model')
// auth/passport load config
require('auth/config')

app.use(responseTime())
// security
app.use(cors())
app.use(helmet())
// logger
if(env && (env === 'dev' || env === 'development')) {
  app.use(require('morgan')('tiny'))
}
// content-type allowed
app.use(bodyParser.json())
// cookies
app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [config.get('COOKIE_SESSION_KEY')]
  })
)
// passport initialize and session
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

// handle the next(error) calls
app.use((info, req, res, next) => {
  const { status, message } = info
  if(env && (env === 'dev' || env === 'development')) {
    console.log(JSON.stringify(info, null, 2))
  }
  res.status(status).send(message)
})

exports.app = app
exports.start = async () => {
  try {
    await database.connect()
    console.log('Connected to database')
    await app.listen(port)
    console.log(`Connected on port: ${port}`)
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}
