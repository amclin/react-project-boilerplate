import React from 'react'
import Link from 'next/link'
import PageTitle from '../../components/organisms/PageTitle'
import CountrySelector from '../../components/organisms/CountrySelector'
import SampleHooksComponent from '../../components/atoms/SampleHookComponent'
import Loader from '../../components/molecules/Loader'

const Home = () => {
  return (
    <div className="text-center">
      <PageTitle title="tmp-1234" />
      <p>Welcome to the boilerplate React app using NextJS!</p>
      <p>
        Try navigating to&nbsp;
        <Link href="/example/second-page">another page</Link>
        &nbsp;and observe the URL changing
      </p>
      <SampleHooksComponent />
      <CountrySelector />
      <h1 className='underline'>Micro Frontends</h1>
      <div className='micro-frontend'>
        <h3>React 15</h3>
        <Loader
          src='http://localhost:3000/static/mf1.js'
          namespace='mf1'
          renderWhileLoading={() => 'Loading mf1'}
        />
        <div className='micro-frontend' id='mf1' />
        <h3>React 16.10, useState Hook</h3>
        <Loader
          src='http://localhost:3000/static/mf2.js'
          namespace='mf2'
          renderWhileLoading={() => 'Loading mf2'}
        />
        <div className='micro-frontend' id='mf2' />
        <h3>useState and useEffect Hook</h3>
        <Loader
          src='http://localhost:3000/static/mf3.js'
          namespace='mf3'
          renderWhileLoading={() => 'Loading mf3'}
        />
        <div className='micro-frontend' id='mf3' />
        <h3>useState and useEffect Hook, apollo, useQuery Hook</h3>
        <Loader
          src='http://localhost:3000/static/mf4.js'
          namespace='mf4'
          renderWhileLoading={() => 'Loading mf4'}
        />
        <div className='micro-frontend' id='mf4' />
        <h3>apollo, useQuery Hook</h3>
        <Loader
          src='http://localhost:3000/static/mf5.js'
          namespace='mf4'
          renderWhileLoading={() => 'Loading mf5'}
        />
        <div className='micro-frontend' id='mf5' />
      </div>
      <style jsx global>
        {`
          .text-center {
            text-align: center;
          }
          .micro-frontend {
            border: solid 1px gray;
            margin: 5px 15px;
            padding: 15px;
          }
          .underline {
            text-decoration: underline;
          }
          h3 {
            margin-bottom: 0;
          }
        `}
      </style>
    </div>
  )
}

export default Home
