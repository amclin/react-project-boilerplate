import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from '@apollo/react-hooks'
import Country from '.'

jest.mock('@apollo/react-hooks')

describe('Country', () => {
  let mockQueryResponse = {}

  it('should render no country output when no code provided', () => {
    mockQueryResponse = {
      loading: true
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<Country />)

    expect(getByTestId('no-code-div').textContent).toBe('No country selected')
  })
  it('should render error output on error', () => {
    mockQueryResponse = {
      error: {
        graphQLErrors: []
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<Country code="US" />)

    expect(getByTestId('error-div').textContent).toBe('Error!')
  })
  it('should render loading output when loading', () => {
    mockQueryResponse = {
      loading: true
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<Country code="US" />)

    expect(getByTestId('loading-div').textContent).toBe('Loading...')
  })

  it('should render empty country output when no data', () => {
    mockQueryResponse = {
      loading: false,
      data: {}
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { getByTestId } = render(<Country code="NONE" />)

    expect(getByTestId('no-data-div').textContent).toBe('No Country Data')
  })

  it('should render a Country', () => {
    mockQueryResponse = {
      loading: false,
      data: {
        country: {
          name: 'United States',
          code: 'US',
          emoji: 'E'
        }
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    const { asFragment, getByTestId } = render(<Country code="US" />)
    const name = getByTestId('country-name')
    const emoji = getByTestId('country-emoji')

    expect(name.textContent).toBe(mockQueryResponse.data.country.name)
    expect(emoji.textContent).toBe(mockQueryResponse.data.country.emoji)
    expect(asFragment()).toMatchSnapshot()
  })
})
