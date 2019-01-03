const bodyParser = require('body-parser')
const helmet = require('helmet')
const responseTime = require('response-time')
const config = require('configuration')
const database = require('database')
const router = require('routing')
const app = require('express')()
const port = config.get('PORT')
const env = config.get('ENV')

app.use(responseTime())
app.use(helmet())
if(env && (env === 'dev' || env === 'development')) {
  app.use(require('morgan')('combined'))
}
app.use(bodyParser.json())
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
