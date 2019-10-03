const { execSync } = require('child_process')
const dns = require('dns')
const url = require('url')

const getProxy = () => {
  if (process.env.https_proxy) {
    return process.env.https_proxy
  }

  try {
    const httpsProxy = execSync('npm config get https-proxy')
      .toString()
      .trim()
    return httpsProxy !== 'null' ? httpsProxy : undefined
  } catch (e) {
    return undefined
  }
}

const getOnline = () => {
  return new Promise(resolve => {
    return dns.lookup('registry.yarnpkg.com', registryErr => {
      if (!registryErr) {
        return resolve(true)
      }

      const proxy = getProxy()
      if (!proxy) {
        return resolve(false)
      }

      const { hostname } = url.parse(proxy)
      if (!hostname) {
        return resolve(false)
      }

      return dns.lookup(hostname, proxyErr => {
        resolve(proxyErr == null)
      })
    })
  })
}

module.exports = {
  getOnline,
  getProxy
}
