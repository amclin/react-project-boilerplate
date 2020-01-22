import React, { Component } from 'react'
import { render } from '@testing-library/react'
import { withApollo } from './apollo'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    apiGatewayUrl: process.env.API_GATEWAY_URL
  }
}))

// eslint-disable-next-line
class AppWithProps extends Component {
  render() {
    return <div data-testid="sample-app">OK!</div>
  }
}

// eslint-disable-next-line
const AppWithNoProps = () => <div data-testid="sample-app">OK!</div>

describe('apollo', () => {
  it('server side', () => {
    const SampleComponentWithApollo = withApollo(AppWithNoProps)
    const { asFragment, getByTestId } = render(<SampleComponentWithApollo />)

    expect(getByTestId('sample-app')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  it('server side with getInitialProps unfinished', () => {
    const mockCtx = {}
    AppWithProps.getInitialProps = jest.fn().mockResolvedValue(mockCtx)

    const SampleComponentWithApollo = withApollo(AppWithProps)
    const { asFragment, getByTestId } = render(<SampleComponentWithApollo />)

    expect(SampleComponentWithApollo.getInitialProps(mockCtx)).toMatchSnapshot()
    expect(getByTestId('sample-app')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  it('server side with getInitialProps finished', () => {
    const mockCtx = { res: { finished: true } }
    AppWithProps.getInitialProps = jest.fn().mockResolvedValue(mockCtx)

    const SampleComponentWithApollo = withApollo(AppWithProps)
    const { asFragment, getByTestId } = render(<SampleComponentWithApollo />)

    expect(SampleComponentWithApollo.getInitialProps(mockCtx)).toMatchSnapshot()
    expect(getByTestId('sample-app')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()
  })

  it('client side with getInitialProps', () => {
    jest.resetModules() // this is important - it clears the cache
    process.browser = true

    const mockCtx = {}
    AppWithProps.getInitialProps = jest.fn().mockResolvedValue(mockCtx)

    const SampleComponentWithApollo = withApollo(AppWithProps)
    const { asFragment, getByTestId } = render(<SampleComponentWithApollo />)

    expect(SampleComponentWithApollo.getInitialProps(mockCtx)).toMatchSnapshot()
    expect(getByTestId('sample-app')).toBeTruthy()
    expect(asFragment()).toMatchSnapshot()

    jest.resetModules()
  })
})
