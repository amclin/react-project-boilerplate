import React from 'react'
import { render } from '@testing-library/react'
import Country from '.'

describe('Country', () => {
  it('should render a Country', () => {
    const { asFragment, getByTestId } = render(<Country name="United States" />)
    const name = getByTestId('country-name')

    expect(name.textContent).toBe('United States')
    expect(asFragment()).toMatchSnapshot()
  })
})
