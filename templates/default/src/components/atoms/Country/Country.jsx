import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import COUNTRY_QUERY from '../../../graphql/queries/country'

const Country = ({ code }) => {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { code }
  })

  if (!code) {
    return (
      <div data-testid="no-code-div" className="country">
        No country selected
      </div>
    )
  }
  if (error) {
    return (
      <div data-testid="error-div" className="country">
        Error!
      </div>
    )
  }
  if (loading) {
    return (
      <div data-testid="loading-div" className="country">
        Loading...
      </div>
    )
  }
  if (data.country) {
    const { name, emoji } = data.country

    return (
      <div className="country">
        <div data-testid="country-name">{name}</div>
        <div data-testid="country-emoji">{emoji}</div>
      </div>
    )
  }
  return (
    <div data-testid="no-data-div" className="country">
      No Country Data
    </div>
  )
}

Country.propTypes = {
  code: PropTypes.string
}

Country.defaultProps = {
  code: ''
}

export default Country
