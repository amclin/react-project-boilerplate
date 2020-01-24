import {ApolloServer, gql} from 'apollo-server-micro'

const typeDefs = gql`
type Query {
  user: User!
  account: Account!
}
type User {
  username: String
}
type Account {
  number: Int
}
`

const resolvers = {
  Query: {
    user(parent, args, context) {
      return {username: 'NextJS Endpoint User'}
    },
    account(parent, args, context) {
      return {number: 8123412}
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })