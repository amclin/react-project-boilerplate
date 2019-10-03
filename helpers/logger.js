/* eslint-disable no-console */
const log = (message = '') => console.log(message)
const error = (message, e = '') => console.error(message, e)

module.exports = {
  log,
  error
}
