const { execSync } = require('child_process')

const shouldUseYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  shouldUseYarn
}
