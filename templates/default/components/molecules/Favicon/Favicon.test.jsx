import React from 'react'
import TestRenderer from 'react-test-renderer'
import Favicon from '.'

describe('Favicon', () => {
  it('creates a list of <link> elements for favicons suitable for the document head', () => {
    const result = TestRenderer.create(
      <Favicon />
    ).toJSON()

    expect(result).toMatchSnapshot()
  })
})
