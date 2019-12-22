// https://github.com/trevorblades/countries
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import countriesQuery from '../../../graphql/queries/countries'
import Country from '../../atoms/Country'

const CountrySelector = () => {
  const { loading, error, data } = useQuery(countriesQuery);
  const [selectedCountryCode, handleSelectedCountryCode] = useState('')

  if (error) {
    return <div>Error!</div>
  } if (loading) {
    return <div>Loading Countries...</div>
  } 

  const {
    countries = []
  } = data

  return (
    <div style={{border: 'solid 1px black', margin: '15px', padding: '15px'}}>
      <div>Choose a country!</div>
      <select value={selectedCountryCode} onChange={(e)=>handleSelectedCountryCode(e.target.value)}>
        {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
      </select>
      <div>{selectedCountryCode ? 'Your chosen country is:' : 'No country chosen.'}</div>
      {selectedCountryCode && <Country code={selectedCountryCode} />}
    </div>
  )
}

export default CountrySelector
