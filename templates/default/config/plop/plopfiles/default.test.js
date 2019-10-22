import config from './default'

const mockPlop = {}
const mockHelpers = {}
mockPlop.setGenerator = jest.fn()
mockPlop.addHelper = jest.fn((name, fn) => {
  mockHelpers[name] = fn
})

describe('plopfile:default', () => {
  afterEach(() => {
    mockPlop.setGenerator.mockClear()
    mockPlop.addHelper.mockClear()
  });
  it('provides the default plop configuration', () => {
    config(mockPlop)
    expect(mockPlop.setGenerator.mock.calls.length).toEqual(2)
    expect(mockPlop.setGenerator.mock.calls[0]).toMatchSnapshot()
  })
  describe('helpers.relativeSegments()', () => {
    it('generates a relative path with depth matching provided depth', () => {
      config(mockPlop)
      expect(mockPlop.setGenerator.mock.calls.length).toEqual(2)
      expect(mockHelpers.relativeSegments('my/example/page')).toEqual('../../')
      expect(mockHelpers.relativeSegments('page')).toEqual('')
    })
  })
})
