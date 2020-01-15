import React from 'react'
import { render } from '@testing-library/react'
import PageTitle from '.'

jest.mock('next/head', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ children }) => <>{children}</>
}))

describe('PageTitle', () => {
  it('creates a <head> element suitable for global usage across all pages', () => {
    const mockTitle = 'mock title for test'
    const { asFragment, getByTestId } = render(<PageTitle title={mockTitle} />)

    expect(getByTestId('title').textContent).toBe(mockTitle)
    expect(asFragment()).toMatchSnapshot()
  })
})
