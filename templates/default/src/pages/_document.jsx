/* _document is only rendered on the server side and not on the client side
 * Event handlers like onClick can't be added to this file
 */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicon from '../components/molecules/Favicon'
import Manifest from '../components/molecules/Manifest'

class MyDocument extends Document {
  /* getInitialProps()
   * getInitialProps allows you to run controller logic or
   * make async calls before the document is rendered and
   * sent to the client. Use example below
   * https://github.com/zeit/next.js/blob/canary/examples/blog-starter/pages/_document.js
   */

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* HEADER ELEMENTS THAT GO HERE:
           * meta tags, global scripts, global stylesheets, rel links, etc.
           * Tracking scripts like Google Analytics (try https://github.com/react-ga/react-ga)
           */}
          <Favicon />
          <Manifest />
        </Head>
        <body>
          {/* NOSCRIPT: place them inside a new <noscript> tag here */}
          <Main />
          <NextScript />
          {/* FOOTER: If your footer will not change based on api calls, place here, otherwise place in _app.js */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
