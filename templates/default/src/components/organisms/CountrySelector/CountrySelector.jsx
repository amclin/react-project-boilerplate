import React, { useState } from 'react'
import Country from '../../atoms/Country'

const CountrySelector = () => {
  // Data will be sourced from apollo once added
  const countries = [
    {
      code: 'US',
      name: 'United States'
    },
    {
      code: 'FR',
      name: 'France'
    }
  ]
  const [selectedCountryCode, handleSelectedCountryCode] = useState('US')

  return (
    <div className="country-selector">
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
      <div>Your chosen country is:</div>
      <Country
        name={countries.find(c => c.code === selectedCountryCode).name}
      />
      <style jsx>
        {`
          .country-selector {
            border: solid 1px black;
            margin: 15px;
            padding: 15px;
          }
        `}
      </style>
    </div>
  )
}

export default CountrySelector
