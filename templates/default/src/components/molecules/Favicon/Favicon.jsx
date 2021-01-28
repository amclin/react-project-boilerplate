import React from 'react'
import HeadLink from '../../atoms/HeadLink'

const Favicon = () => (
  <>
    <HeadLink
      rel="apple-touch-icon"
      type="image/png"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <HeadLink
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <HeadLink
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
  </>
  )

export default Favicon
