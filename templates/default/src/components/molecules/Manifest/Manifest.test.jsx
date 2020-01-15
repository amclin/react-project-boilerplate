import React from 'react'
import { render } from '@testing-library/react'
import Manifest from '.'

describe('Manifest', () => {
  it('creates a manifest <link> element suitable for the document head', () => {
    const { asFragment } = render(<Manifest />)
    expect(asFragment()).toMatchSnapshot()
  })
})
