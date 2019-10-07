import React from 'react'
import PropTypes from 'prop-types'

const HeadLink = ({rel, href, type, sizes}) => {
  return(
    <link
      rel={rel}
      type={type}
      sizes={sizes}
      href={href}
    />
  )
}

HeadLink.propTypes = {
  rel: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.string,
  sizes: PropTypes.string
};

HeadLink.defaultProps = {
  href: null,
  type: undefined,
  sizes: null
}

export default HeadLink
