import React from 'react'
import { render } from '@testing-library/react'
import HeadLink from '.'

describe('HeadLink', () => {
  it('creates a <link> element suitable for the document head', () => {
    const { asFragment } = render(
      <HeadLink
        rel="mockRel"
        type="mockType"
        sizes="mockSizes"
        href="http://example.com"
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
