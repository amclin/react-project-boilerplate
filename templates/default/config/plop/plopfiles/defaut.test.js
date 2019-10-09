import config from './default'

const mockPlop = {}
mockPlop.setGenerator = jest.fn()

describe('plopfile:default', () => {
  it('provides the default plop configuration', () => {
    config(mockPlop)
    expect(mockPlop.setGenerator.mock.calls.length).toEqual(1)
    expect(mockPlop.setGenerator.mock.calls[0]).toMatchSnapshot()
  })
})
