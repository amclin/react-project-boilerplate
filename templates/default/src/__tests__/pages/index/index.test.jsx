import React from 'react'
import renderer from 'react-test-renderer'
import { useQuery } from '@apollo/react-hooks'
import App from '../../../pages/index'

jest.mock('@apollo/react-hooks')
useQuery.mockReturnValue({loading: true})

describe('Pages:Homepage', () => {
  it('renders the homepage', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
