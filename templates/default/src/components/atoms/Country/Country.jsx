import React from 'react'
import PropTypes from 'prop-types'

const Country = ({ name }) => {
  return (
    <div className="country">
      <div data-testid="country-name">{name}</div>
      <style jsx>
        {`
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

Country.propTypes = {
  name: PropTypes.string
}

Country.defaultProps = {
  name: ''
}

export default Country
