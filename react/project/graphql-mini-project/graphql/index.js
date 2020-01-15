import express from 'express'
import bodyParser from 'body-parser'
import {
  graphqlExpress,
  graphiqlExpress,
} from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import mongoose from 'mongoose'
import path from 'path'
import {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} from 'merge-graphql-schemas'
import cors from 'cors'

mongoose.Promise = global.Promise

import models from './models'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
const PORT = 3000

const app = express ()

app.use(cors({ origin: ['http://localhost:3001'] }))
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    models,
    user: {
      _id: 1,
      username: 'lvelasquez',
    },
  },
}))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

mongoose.connect('mongodb://localhost:27017/instagram-clone')
  .then(() => app.listen(PORT, () => console.log('Running GraphQL Server ...')))
