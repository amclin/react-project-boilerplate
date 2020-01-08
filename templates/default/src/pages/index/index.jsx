import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'

const Home = () => {
  return (
    <div className="text-center">
      <PageTitle title="%%APPNAME%%" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to
        <Link href="/example/second-page">another page</Link>
        and observe the URL changing
      </p>
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
