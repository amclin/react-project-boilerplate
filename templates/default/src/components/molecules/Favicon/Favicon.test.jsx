import React from 'react'
import { render } from '@testing-library/react'
import Favicon from '.'

describe('Favicon', () => {
  it('creates a list of <link> elements for favicon suitable for the document head', () => {
    const { asFragment } = render(<Favicon />)
    expect(asFragment()).toMatchSnapshot()
  })
})
