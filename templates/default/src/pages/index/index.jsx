import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'
// CountrySelector doesn't work in static setup and should be separated when convenient
import CountrySelector from '../../components/organisms/CountrySelector'

const Home = () => {
  return (
    <div className="text-center">
      <PageTitle title="%%APPNAME%%" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to&nbsp;
        <Link href="/example/second-page">another page</Link>
        &nbsp;and observe the URL changing
      </p>
      <p>
        See app information on the version page at&nbsp;
        <Link href="/api/version">SSR HERE</Link>
        &nbsp;or&nbsp;
        <Link href="/version">Static Site HERE</Link>
      </p>
      <CountrySelector />
      <style jsx global>
        {`
          .text-center {
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}

export default Home
