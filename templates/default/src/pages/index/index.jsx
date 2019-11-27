import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'

const Home = () => {
  return (
    <>
      <PageTitle title="%%APPNAME%%" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to
        <Link href="/example/second-page">another page</Link>
        and observe the URL changing
      </p>
    </>
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
