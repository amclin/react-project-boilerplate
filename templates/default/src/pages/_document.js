/* eslint-disable */

/*
  Note: React-components outside of <Main /> will not be initialised by the browser.
  Do not add application logic here. If you need shared components in all your pages (like a menu or a toolbar),
  take a look at the "pages/index" component instead.
 
  Read more here. https://nextjs.org/docs/#custom-document
*/

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { defaultLanguage } from '../../language.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={defaultLanguage}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
