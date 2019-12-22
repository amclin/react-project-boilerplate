describe('env', () => {
  it('should have a API_GATEWAY_URL', () => {
    expect(process.env.API_GATEWAY_URL).toBe('https://countries.trevorblades.com/')
  });
  it('should have APP_ENV=dev PROXY_SERVER_URL value', () => {
    const devEnvProxyServerUrl = 'http://testhost:9999/'
    expect(process.env.APP_ENV).toBe('dev')
    expect(process.env.PROXY_SERVER_URL).toBe(devEnvProxyServerUrl)
  });
  it('should not have RANDOM_ENV_VARIABLE', () => {
    expect(process.env.RANDOM_ENV_VARIABLE).toNotExist
  });
});