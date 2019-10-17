import React from 'react'
import TestRenderer from 'react-test-renderer'
import SecondPage from '.'

describe('Pages:SecondPage', () => {
  it('renders an example page', () => {
    const result = TestRenderer.create(
      <SecondPage />
    ).toJSON()

    expect(result).toMatchSnapshot()
  })
})
