import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from '@apollo/react-hooks'
import App from '../../../pages/index'

jest.mock('@apollo/react-hooks')
useQuery.mockReturnValue({ loading: true })

describe('Pages:Homepage', () => {
  it('renders the homepage', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
