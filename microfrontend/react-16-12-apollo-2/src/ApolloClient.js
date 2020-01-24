import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import {ApolloLink} from 'apollo-link'

export default ({ uri, headers }) => {
  return new Promise((resolve, reject) => {
    try {
      const client = new ApolloClient({
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
              graphQLErrors.forEach(
                ({ message, locations, path }) => console.log(`GraphQL Error: M: ${message}, L: ${locations}, P: ${path }`)
              )
            }
            if (networkError) { console.log(`Network Error: ${networkError}`) } 
          }),
          new HttpLink({
            uri, headers
          })
        ]),
        cache: new InMemoryCache()
      })
      resolve(client)
    } catch (err) {
      resolve(`Connection Error in Meta: ${err}`)
    }
  })
}