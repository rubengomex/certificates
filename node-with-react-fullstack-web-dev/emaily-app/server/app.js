const bodyParser = require('body-parser')
const chalk = require('chalk')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
const cookieSession = require('cookie-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const config = require('configuration')
const database = require('database')
const router = require('routing')
const app = require('express')()
const port = config.get('PORT')
const env = config.get('NODE_ENV')

// Ensures that User collection is created when we boot the app
require('api/users/model')
// auth/passport load config
require('auth/config')

app.use(responseTime())
app.use(compression())
// security
app.use(cors())
app.use(helmet())
// logger
if(env === 'dev') {
  app.use(require('morgan')('tiny'))
}
// content-type allowed
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// express validator and sanitizer
app.use(expressValidator())
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

app.disable('x-powered-by')

// routes
app.use('/', router)

// handle the next(error) calls
if(env === 'dev') {
  app.use(require('errorhandler')())
} else {
  app.use((info, req, res, next) => {
    const { status, message } = info
    console.error(JSON.stringify(info, null, 2))
    res.status(status).send(message)
  })
}

exports.app = app
exports.start = async () => {
  try {
    await database.connect()
    console.log('%s Connected to database', chalk.green('✓'))
    await app.listen(port)
    console.log('%s App running at %d in %s mode', chalk.green('✓'), port, env)
    console.log('  Press CTRL-C to stop\n')
  } catch (error) {
    console.error('Something went wrong')
    console.error(error)
  }
}
