/* eslint-disable react/jsx-props-no-spreading, no-console */
/* FOR SERVER SIDE RENDERING APOLLO FETCHES: Use unmodifed link below.
 * https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/apollo.js
 * this file is modified from link above. Had some issues getting it to work with hooks.
 */
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { apiGatewayUrl } = publicRuntimeConfig
let apolloClient = null

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  return new ApolloClient({
    ssrMode: false, // !process.browser
    link: new HttpLink({
      uri: apiGatewayUrl, // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (!process.browser) {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 */
export function withApollo(PageComponent) {
  // eslint-disable-next-line
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line
      const apolloClient = (ctx.apolloClient = initApolloClient())

      // Run wrapped getInitialProps methods
      const pageProps = await PageComponent.getInitialProps(ctx)

      // Only on the server:
      if (!process.browser) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}

export default withApollo
