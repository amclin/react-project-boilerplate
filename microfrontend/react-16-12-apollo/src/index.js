import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import gql from 'graphql-tag'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import withApolloClient from './ApolloClient'
import 'regenerator-runtime/runtime'

const dummyUserEndpoint = 'https://jsonplaceholder.typicode.com/users/1'

const HooksComponent = () => {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [graphqlUser, setGraphqlUser] = useState({})

  useQuery(
    gql`
      query {
        user {
          username
        }
      }
    `,
    {
      onCompleted: ({ user }) => setGraphqlUser(user),
      onError: () => console.log('graphql error trying to fetch user')
    }
  )
  useEffect(() => {
    fetch(dummyUserEndpoint, {method: 'GET'})
    .then(res => res.json())
    .then(user => setUser(user))
  }, []);
  
  return (
    <div className='react-16-micro-frontend'>
      <span>Micro Frontend Using React Version {React.version}</span>
      <div><strong>Counter</strong></div>
      <div>{count}</div>
      <button onClick={() => setCount(count+1)}>Increase +1</button>
      <div>Sample User: {user.username || 'loading...'}</div>
      <div>Graphql User: {graphqlUser.username || 'loading...'}</div>
    </div>
  )
}

export default (async (uri) => {
  let ROOT = null

  const client = await withApolloClient({ uri, headers: {} })
  
  if (__IS_DEV__) {
    ROOT = document.querySelector('#app')
  } else {
    ROOT = document.querySelector('#mf4')
  }

  try {
    ROOT && render(
      <ApolloProvider client={client}>
        <HooksComponent />
      </ApolloProvider>,
      ROOT
    )
  } catch (err) {
    throw new Error('missing #mf4 in dom')
  }
})((window['__GRAPHQL_URI__'] || 'http://localhost:3000/api/graphql'))