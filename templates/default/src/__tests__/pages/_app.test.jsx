import React from 'react'
import App from '../../pages/_app'

App.displayName = 'App'

jest.mock('../../utils/apollo', () => ({
  withApollo: () => async Component => {
    const props = await Component.getInitialProps({ Component })

    // eslint-disable-next-line
    return <Component {...props} />
  }
}))

const mockComponent = () => {
  return <div>Ok!</div>
}

describe('App', () => {
  it('controls the root NextJS app', () => {
    expect(<App Component={mockComponent} pageProps={{}} />).toMatchSnapshot()
  })
})
