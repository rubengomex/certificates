const Sequelize = require('sequelize')
const config = require('configuration')
const url = config.get('MONGO_URL')
const db = config.get('SEQUELIZE_DATABASE_NAME')
const dbUser = config.get('SEQUELIZE_DATABASE_USER_NAME')
const dbPass = config.get('SEQUELIZE_DATABASE_PASSWORD')

exports.connect = () => {
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
