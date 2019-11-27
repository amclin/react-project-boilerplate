import React from 'react'
import PropTypes from 'prop-types'
import App from 'next/app'

/*
 * Import your global CSS here
 */

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    /* All Global Wrappers & Providers Go Here, for example:
     * state management, CSS themes, tracker provider, apollo
     */
    return <Component {...pageProps} />
  }
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object
}

MyApp.defaultProps = {
  pageProps: undefined
}

export default MyApp
