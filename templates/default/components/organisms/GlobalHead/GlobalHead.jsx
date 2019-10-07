import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Favicon from '../../molecules/Favicon'
import Manifest from '../../molecules/Manifest'

const GlobalHead = ({title}) => {
  return(
    <Head>
      <title>{title}</title>
      <Favicon />
      <Manifest />
    </Head>
  )
}

GlobalHead.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GlobalHead
