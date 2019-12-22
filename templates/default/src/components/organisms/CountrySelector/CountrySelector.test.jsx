import React from 'react'
import { create } from 'react-test-renderer'
import { useQuery } from '@apollo/react-hooks'
import CountrySelector from '.'

jest.mock('@apollo/react-hooks')

describe('CountrySelector', () => {
  let wrapper = null;
  let mockQueryResponse = {}
  
  it('should render loading output when loading', () => {
    mockQueryResponse = {
      loading: true
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<CountrySelector />)

    expect(wrapper.root.findByType('div').props.children).toBe('Loading Countries...')    
  })
  it('should render error output on error', () => {
    mockQueryResponse = {
      error: {
        graphQLErrors: []
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<CountrySelector />)

    expect(wrapper.root.findByType('div').props.children).toBe('Error!')    
  })
  it('should let you choose a country', () => {
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
          },
        ]
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<CountrySelector />)

    const chooseCountryDiv = wrapper.root.findByType('div').children[2].props.children
    const select = wrapper.root.findByType('div').children[1]
    const selectOptions = select.props.children

    expect(chooseCountryDiv).toBe('No country chosen.')  
    expect(select).toExist
    expect(selectOptions.length).toBe(3)

    // Todo: Check how to change the select value for further testing based on act()
    // using this to update state will give 100% code coverage
  })
})
