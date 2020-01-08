import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Document from '../../pages/_document'

describe('_document', () => {
  it('renders react html page', () => {
    const renderer = new ShallowRenderer()
    const component = renderer.render(<Document />)

    expect(component.props.children.length).toBe(2)
    expect(component.props.children[1].type).toBe('body')
    expect(component.props.lang).toBe('en')
  })
})
