import config from '../plopfile'

const mockPlop = {}
mockPlop.load = jest.fn()

describe('plopfile:global', () => {
  it('loads the default plopfile', () => {
    config(mockPlop)
    expect(mockPlop.load.mock.calls.length).toEqual(1)
    expect(mockPlop.load.mock.calls).toEqual([['./config/plop/plopfiles/default.js']])
  })
})
