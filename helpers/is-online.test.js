jest.mock('child_process')
jest.mock('dns')
const { execSync } = require('child_process')
const { lookup } = require('dns')
const { getProxy, getOnline } = require('./is-online')

const cacheEnv = {}

describe('is-online', () => {
  beforeAll(() => {
    if(process.env.https_proxy) {
      cacheEnv.https_proxy = process.env.https_proxy
    }
  })
  beforeEach(() => {
    delete process.env.https_proxy
  })
  afterAll(() => {
    Object.assign(process.env, cacheEnv)
  })
  describe('getProxy()', () => {
    it('retrieves the npm proxy configuration from environment if available', () => {
      const expected = 'mock proxy setting env'
      process.env.https_proxy = expected
      const result = getProxy()
      expect(result).toEqual(expected)
    })
    it('retrieves the npm proxy configuration from npm config', () => {
      const expected = 'mock proxy setting npm config'
      execSync.mockReturnValueOnce(expected)
      const result = getProxy()
      expect(result).toEqual(expected)
    })
    it('returns undefined when npm command errors', () => {
      execSync.mockImplementationOnce(() => { throw new Error('mock failed npm command')})
      const result = getProxy()
      expect(result).toEqual(undefined)
    })
  })
  describe.skip('getOnline()', () => {
    // TODO - not sure the getOnline interface even works!
    it('uses DNS to see if Yarn registry is reachable', () => {
      lookup.mockReturnValueOnce('mock dns result')
      return getOnline((resolved) => {
        expect(resolved).toEqual(true)
      })
    })
  })
})