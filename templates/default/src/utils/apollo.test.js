import React, { Component } from 'react'
import renderer from 'react-test-renderer'
import { withApollo } from './apollo'
jest.mock('next/config', () => () => ({ 
  publicRuntimeConfig: { 
    urls: {
      apiGatewayUrl: process.env.API_GATEWAY_URL
    } 
  } 
}))


describe('apollo', () => {
  it('should run without error', () => {
    class App extends Component {
      static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
    
        return { pageProps }
      }
    
      render() {
        return <div>OK!</div>
      }
    }
    const SampleComponentWithApollo = withApollo(App, {ssr: true})
    const component = renderer.create(<SampleComponentWithApollo />)
    
    expect(component).toExist
  });
  it('should run non-SSR without error', () => {
    class SampleComponent extends Component {
      render() {    
        return <div>OK!</div>
      }
    }
    const SampleComponentWithApollo = withApollo(SampleComponent, {ssr: false})
    const component = renderer.create(<SampleComponentWithApollo />)
    
    expect(component).toExist
  });
});