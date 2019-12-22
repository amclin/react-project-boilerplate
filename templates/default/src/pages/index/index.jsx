import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'
import CountrySelector from '../../components/organisms/CountrySelector'

const Home = () => {
  return (
    <div style={{textAlign: 'center'}}>
      <PageTitle title="%%APPNAME%%" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to
        <Link href="/example/second-page"> another page </Link>
        and observe the URL changing
      </p>
      <p>Or try interacting with our graphql country endpoint</p>
      <CountrySelector />
    </div>
  )
}

// estlin-disable-next-line
Home.getInitialProps = async context => {
  /* Here you can make your pre-fetch for this page, it's a pre-rendering step
   * only available for pages.
   * Useful parameters in context object: req, res, query (passed from 4th render argument)
   * It expects an object with props to be returned
   */
  return {}
}

export default Home
