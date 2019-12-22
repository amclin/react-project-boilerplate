// https://github.com/trevorblades/countries
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'
import COUNTRY_QUERY from '../../../graphql/queries/country'

const Country = ({code}) => {
  const { loading, error, data } = useQuery(COUNTRY_QUERY, {
    variables: { code },
  });
  const wrapperStyle = {
    border: 'dashed 1px gray',
    padding: '10px',
    fontWeight: 600,
    fontSize: '16px'
  }

  if (!code) {
    return <div style={wrapperStyle}>No country selected</div>
  } if (error) {
    return <div style={wrapperStyle}>Error!</div>
  } if (loading) {
    return <div style={wrapperStyle}>Loading...</div>
  } if (data.country) {
    const {
      name,
      emoji
    } = data.country

    return (
      <div style={wrapperStyle}>
        <div>{name}</div>
        <div>{emoji}</div>
      </div>
    )
  }
  return <div style={wrapperStyle}>No Country Data</div>
}

Country.propTypes = {
  code: PropTypes.string,
};

Country.defaultProps = {
  code: '',
};

export default Country
