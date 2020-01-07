// load .env file if present, takes an object with path argument if needed
require('dotenv').config()

// Place all configs here so that NextJS can properly control configs
const exampleApiGateway = 'https://countries.trevorblades.com/'
const config = {
  appEnv: process.env.APP_ENV || 'default',
  apiGatewayUrl: process.env.API_GATEWAY_URL || exampleApiGateway
}

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client (but not during build)
    ...config
  }
}
