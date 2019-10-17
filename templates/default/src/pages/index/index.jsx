import React from 'react'
import Link from 'next/link'
import GlobalHead from '../../components/organisms/GlobalHead'

const Home = () => {
  return (
    <>
      <GlobalHead title="%%APPNAME%%" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to

        <Link href="/example/second-page">another page</Link>

        and observe the URL changing
      </p>
    </>
  )
}

export default Home
