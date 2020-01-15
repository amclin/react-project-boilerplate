import React from 'react'
import { render } from '@testing-library/react'
import App from '../../../pages/index'

describe('Pages:Homepage', () => {
  it('renders the homepage', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
