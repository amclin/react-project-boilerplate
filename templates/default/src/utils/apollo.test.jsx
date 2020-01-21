import React, { Component } from 'react'
import { render } from '@testing-library/react'
import { withApollo } from './apollo'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    apiGatewayUrl: process.env.API_GATEWAY_URL
  }
}))

describe('apollo', () => {
  // eslint-disable-next-line
  class SampleApp extends Component {
    render() {
      return <div data-testid="sample-app">OK!</div>
    }
  }

  SampleApp.getInitialProps = async appContext => {
    const appProps = await SampleApp.getInitialProps(appContext)

    return { ...appProps }
  }

  it('should run without error', () => {
    const SampleComponentWithApollo = withApollo(SampleApp)
    // call below for greater coverage, but currently ctx is undefined
    // SampleComponentWithApollo.getInitialProps()
    const { asFragment, getByTestId } = render(<SampleComponentWithApollo />)

    expect(getByTestId('sample-app')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })
})
