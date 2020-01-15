import React from 'react'
import Link from 'next/link'
import PageTitle from '../../../components/organisms/PageTitle'

const SecondPage = () => {
  return (
    <div className="text-center">
      <PageTitle title="Second Page - %%APPNAME%%" />
      <main>
        <p>This is another page at a different URL.</p>
        <p>
          Return to the&nbsp;
          <Link href="/">homepage</Link>
        </p>
      </main>
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

export default SecondPage
