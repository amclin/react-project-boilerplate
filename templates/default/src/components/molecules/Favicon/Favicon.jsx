import React from 'react'
import HeadLink from '../../atoms/HeadLink'

const Favicon = () => {
  return(
    <>
      <HeadLink
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <HeadLink
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <HeadLink
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </>
  )
}

export default Favicon
