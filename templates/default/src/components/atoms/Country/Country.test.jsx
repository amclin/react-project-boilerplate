import React from 'react'
import { create } from 'react-test-renderer'
import { useQuery } from '@apollo/react-hooks'
import Country from '.'

jest.mock('@apollo/react-hooks')

describe('Country', () => {
  let wrapper = null;
  let mockQueryResponse = {}
  
  it('should render no country output when no code provided', () => {
    mockQueryResponse = {
      error: {
        graphQLErrors: []
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<Country />)

    expect(wrapper.root.findByType('div').props.children).toBe('No country selected')    
  })
  it('should render loading output when loading', () => {
    mockQueryResponse = {
      loading: true
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<Country code='US' />)

    expect(wrapper.root.findByType('div').props.children).toBe('Loading...')    
  })
  it('should render error output on error', () => {
    mockQueryResponse = {
      error: {
        graphQLErrors: []
      }
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<Country code='US' />)

    expect(wrapper.root.findByType('div').props.children).toBe('Error!')    
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
    wrapper = create(<Country code='US' />)

    const nameDiv = wrapper.root.findByType('div').children[0].props.children
    const emojiDiv = wrapper.root.findByType('div').children[1].props.children

    expect(nameDiv).toBe(mockQueryResponse.data.country.name)    
    expect(emojiDiv).toBe(mockQueryResponse.data.country.emoji)    
  })
  it('should render empty country output when no data', () => {
    mockQueryResponse = {
      loading: false,
      data: {}
    }
    useQuery.mockReturnValue(mockQueryResponse)
    wrapper = create(<Country code='US' />)

    expect(wrapper.root.findByType('div').props.children).toBe('No Country Data')    
  })
})
