import React from 'react'
import { render } from '@testing-library/react'
import App from '../../../../pages/example/second-page'

describe('Pages:SecondPage', () => {
  it('renders a second example page', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
