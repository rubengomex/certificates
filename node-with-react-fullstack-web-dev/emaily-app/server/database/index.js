const mongoose = require('mongoose')
const config = require('configuration')
const url = config.get('MONGO_URL')
const db = config.get('MONGO_DATABASE_NAME')

exports.connect = () => {
  mongoose.Promise = global.Promise
  return new Promise((resolve, reject) => {
    mongoose.connect(
      `${url}/${db}`,
      { useNewUrlParser: true }
    )

    const connection = mongoose.connection

    connection.on('error', reject)
    connection.once('open', resolve)
  })
}

exports.model = key => mongoose.model(key)
