import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './schemas/schema'

const app = express()

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
)

app.listen(4000, () => {
  console.log('Listening')
})
