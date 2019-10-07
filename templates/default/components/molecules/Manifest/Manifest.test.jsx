import React from 'react'
import TestRenderer from 'react-test-renderer'
import Manifest from '.'

describe('Manifest', () => {
  it('creates a manifest <link> element suitable for the document head', () => {
    const result = TestRenderer.create(
      <Manifest />
    ).toJSON()

    expect(result).toMatchSnapshot()
  })
})
