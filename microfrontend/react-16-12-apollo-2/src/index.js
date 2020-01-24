import React, { useState } from 'react'
import { render } from 'react-dom'
import gql from 'graphql-tag'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import withApolloClient from './ApolloClient'
import 'regenerator-runtime/runtime'

const HooksComponent = () => {
  const [account, setAccount] = useState({})

  useQuery(
    gql`
      query {
        account {
          number
        }
      }
    `,
    {
      onCompleted: ({ account }) => setAccount(account),
      onError: () => console.log('graphql error trying to fetch user')
    }
  )
  
  return (
    <div className='react-16-micro-frontend'>
      <span>Micro Frontend Using React Version {React.version}</span>
      <div>Graphql Account: {account.number || 'loading...'}</div>
    </div>
  )
}

export default (async (uri) => {
  let ROOT = null

  const client = await withApolloClient({ uri, headers: {} })
  
  if (__IS_DEV__) {
    ROOT = document.querySelector('#app')
  } else {
    ROOT = document.querySelector('#mf5')
  }

  try {
    ROOT && render(
      <ApolloProvider client={client}>
        <HooksComponent />
      </ApolloProvider>,
      ROOT
    )
  } catch (err) {
    throw new Error('missing #mf5 in dom')
  }
})((window['__GRAPHQL_URI__'] || 'http://localhost:3000/api/graphql'))