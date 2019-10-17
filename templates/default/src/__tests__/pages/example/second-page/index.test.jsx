import React from 'react'
import renderer from 'react-test-renderer'
import App from '../../../../pages/example/second-page'

describe('Pages:SecondPage', () => {
  it('renders a second example page', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
