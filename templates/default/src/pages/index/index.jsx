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
          .country-selector {
            border: solid 1px black;
            margin: 15px;
            padding: 15px;
          }
          .country {
            border: dashed 1px gray;
            padding: 10px;
            font-weight: 600;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  )
}

export default Home
