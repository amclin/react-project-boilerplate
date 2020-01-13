import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'
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
