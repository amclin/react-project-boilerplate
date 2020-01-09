import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const PageTitle = ({ title }) => {
  return (
    <Head>
      <title key="title">{title}</title>
    </Head>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default PageTitle
