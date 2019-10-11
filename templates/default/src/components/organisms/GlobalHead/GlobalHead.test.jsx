import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import GlobalHead from '.'

describe('GlobalHead', () => {
  // Test uses ShallowRenderer.render() instead of TestRenderer.create()
  // because <GlobalHead> encapsulates NextJS <Head> which in turn uses
  // React <Helmet> and Helmet doesn't show up in a normal component render.
  it('creates a <head> element suitable for global usage across all pages', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <GlobalHead title="mock title for test" />
    )
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
  it('populates the specified page title', () => {
    const title = "mockTitle"
    const renderer = new ShallowRenderer();
    renderer.render(
      <GlobalHead title={title} />
    )
    const result = renderer.getRenderOutput()
    // Expect a React module with a populated <title>
    expect(result.props.children).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'title',
          props: {
            children: title
          }
        })
      ])
    )
  })
})
