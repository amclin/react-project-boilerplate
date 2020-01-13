import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CountrySelector from '.'

describe('CountrySelector', () => {
  it('renders without issue', () => {
    const { asFragment } = render(<CountrySelector />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should let you choose a country', () => {
    const { getByTestId, getAllByTestId, getByDisplayValue } = render(
      <CountrySelector />
    )
    const countries = getByTestId('countries')
    const countryOptions = getAllByTestId('country-option')

    expect(countryOptions.length).toBe(2)
    expect(countries.value).toBe('US')

    fireEvent.change(getByDisplayValue(/United States/i), {
      target: { value: 'FR' }
    })

    expect(countries.value).toBe('FR')

    fireEvent.change(getByDisplayValue(/France/i), {
      target: { value: 'US' }
    })

    expect(countries.value).toBe('US')
  })
})
