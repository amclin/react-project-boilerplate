import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useQuery } from '@apollo/react-hooks'
import CountrySelector from '.'

jest.mock('@apollo/react-hooks')

describe('CountrySelector', () => {
  let mockQueryResponse = {}

  it('should render error output on error', () => {
    mockQueryResponse = {
      error: {
        graphQLErrors: []
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<CountrySelector />)

    expect(getByTestId('error-div').textContent).toBe(
      'Error loading countries!'
    )
  })
  it('should render loading output when loading', () => {
    mockQueryResponse = {
      loading: true
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<CountrySelector />)

    expect(getByTestId('loading-div').textContent).toBe('Loading Countries...')
  })

  it('should render with broken data', () => {
    mockQueryResponse = {
      loading: false,
      data: {}
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<CountrySelector />)
    const container = getByTestId('selector-container')

    // eslint-disable-next-line
    expect(container).toExist
  })

  it('should render and let you choose a country', () => {
    mockQueryResponse = {
      loading: false,
      data: {
        countries: [
          {
            name: 'United States',
            code: 'US',
            emoji: 'E'
          },
          {
            name: 'France',
            code: 'FR',
            emoji: 'F'
          },
          {
            name: 'Canada',
            code: 'CA',
            emoji: 'C'
          }
        ]
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const {
      asFragment,
      getByTestId,
      getAllByTestId,
      getByDisplayValue
    } = render(<CountrySelector />)
    const countries = getByTestId('countries')
    const countryOptions = getAllByTestId('country-option')
    const chosenText = getByTestId('chosen-text')

    expect(countryOptions.length).toBe(3)
    expect(countries.value).toBe('US')
    expect(chosenText.textContent).toBe('No country chosen.')

    fireEvent.change(getByDisplayValue(/United States/i), {
      target: { value: 'FR' }
    })

    expect(countries.value).toBe('FR')
    expect(chosenText.textContent).toBe('Your chosen country is:')

    fireEvent.change(getByDisplayValue(/France/i), {
      target: { value: 'CA' }
    })

    expect(countries.value).toBe('CA')
    expect(chosenText.textContent).toBe('Your chosen country is:')

    expect(asFragment()).toMatchSnapshot()
  })
})
