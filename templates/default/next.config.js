require('./src/utils/dotenv');

const config = require('./src/config');

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    ...config,
  }
}
