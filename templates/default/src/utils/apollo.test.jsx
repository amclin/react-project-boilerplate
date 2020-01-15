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
      return <div>OK!</div>
    }
  }

  it('should run without error', () => {
    const SampleComponentWithApollo = withApollo(SampleApp, { ssr: true })
    const { asFragment } = render(<SampleComponentWithApollo />)

    expect(asFragment()).toMatchSnapshot()
  })
})
