import React from 'react'
import TestRenderer from 'react-test-renderer'
import HeadLink from '.'

describe('HeadLink', () => {
  it('creates a <link> element suitable for the document head', () => {
    const result = TestRenderer.create(
      <HeadLink
        rel="mockRel"
        type="mockType"
        sizes="mockSizes"
        href="http://example.com"
      />
    ).toJSON()

    expect(result).toMatchSnapshot()
  })
})
