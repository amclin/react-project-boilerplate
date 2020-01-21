import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from '../utils/apollo'
// uncomment below if using getInitialProps
// import App from 'next/app'

/*
 * Import your global CSS here
 */

function MyApp({ Component, pageProps }) {
  /* All Global Wrappers & Providers Go Here, for example:
   * state management, CSS themes, tracker provider, apollo
   */
  // eslint-disable-next-line
  return <Component {...pageProps} />
}

// Only uncommet this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)

//   return { ...appProps }
// }

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  // eslint-disable-next-line
  pageProps: PropTypes.object
}

MyApp.defaultProps = {
  pageProps: undefined
}

export default withApollo(MyApp)
