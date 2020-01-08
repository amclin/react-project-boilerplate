import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import PageTitle from '.'

describe('PageTitle', () => {
  // Test uses ShallowRenderer.render() instead of TestRenderer.create()
  // because <PageTitle> encapsulates NextJS <Head> which in turn uses
  // React <Helmet> and Helmet doesn't show up in a normal component render.
  it('creates a <head> element suitable for global usage across all pages', () => {
    const renderer = new ShallowRenderer()
    renderer.render(<PageTitle title="mock title for test" />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
  it('populates the specified page title', () => {
    const title = 'mockTitle'
    const renderer = new ShallowRenderer()
    renderer.render(<PageTitle title={title} />)
    const result = renderer.getRenderOutput()
    // Expect a React module with a populated <title>
    expect(result.props.children).toEqual(
      expect.objectContaining({
        type: 'title',
        props: {
          children: title
        }
      })
    )
  })
})
