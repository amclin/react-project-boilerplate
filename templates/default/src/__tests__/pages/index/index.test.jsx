import React from 'react'
import renderer from 'react-test-renderer'
import App from '../../../pages/index'

describe('Pages:Homepage', () => {
  it('renders the homepage', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
