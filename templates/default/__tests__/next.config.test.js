describe('next.config.js', () => {
  const exampleApiGateway = 'https://countries.trevorblades.com/'

  afterEach(() => {
    // to re-import next.config with new process.env
    jest.resetModules()
  })

  it('should render a correct env object', () => {
    process.env.APP_ENV = ''
    // eslint-disable-next-line
    const config = require('../next.config')

    // eslint-disable-next-line
    expect(process.env.APP_ENV).toNotExist
    expect(config.publicRuntimeConfig.appEnv).toEqual('default')
    expect(config.publicRuntimeConfig.apiGatewayUrl).toEqual(exampleApiGateway)
  })
  it('should render a correct env object', () => {
    process.env.APP_ENV = 'test'
    // eslint-disable-next-line
    const config1 = require('../next.config')

    expect(process.env.APP_ENV).toBe('test')
    expect(config1.publicRuntimeConfig.appEnv).toEqual('test')
    expect(config1.publicRuntimeConfig.apiGatewayUrl).toEqual(exampleApiGateway)
  })
})
