import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import COUNTRIES_QUERY from '../../../graphql/queries/countries'
import Country from '../../atoms/Country'

const CountrySelector = () => {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY)
  const [selectedCountryCode, handleSelectedCountryCode] = useState('')

  if (error) {
    return (
      <div data-testid="error-div" className="country-selector">
        Error loading countries!
      </div>
    )
  }
  if (loading) {
    return (
      <div data-testid="loading-div" className="country-selector">
        Loading Countries...
      </div>
    )
  }

  const { countries = [] } = data

  return (
    <div data-testid="selector-container" className="country-selector">
      <div>Choose a country!</div>
      <select
        value={selectedCountryCode}
        onChange={e => handleSelectedCountryCode(e.target.value)}
        data-testid="countries"
      >
        {countries.map(country => (
          <option
            key={country.code}
            value={country.code}
            data-testid="country-option"
          >
            {country.name}
          </option>
        ))}
      </select>
      <div data-testid="chosen-text">
        {selectedCountryCode ? 'Your chosen country is:' : 'No country chosen.'}
      </div>
      {selectedCountryCode && <Country code={selectedCountryCode} />}
    </div>
  )
}

export default CountrySelector
