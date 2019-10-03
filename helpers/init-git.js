const chalk = require('chalk')
const { execSync } = require('child_process')
const { log } = require('./logger')

const canUseGit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

const initGit = (root, { gitRemote }) => {
  return new Promise((resolve, reject) => {
    if (canUseGit()) {
      try {
        execSync('git init')
        execSync(`git remote add origin ${gitRemote}`)
        resolve()
      } catch (e) {
        log(chalk.red('Failed to initialize git repo'))
        reject(e)
      }
    } else {
      log(chalk.yellow('Git does not appear to be installed'))
      reject(new Error('No git binary found'))
    }
  })
}

const commitFirst = ({ version }) => {
  return new Promise((resolve, reject) => {
    if (canUseGit()) {
      try {
        // Add all files
        execSync(`git add .`)
        // Add specific files normally excluded by .gitignore
        execSync(`git add coverage/badge-*.svg -f`)
        // Commit
        execSync(`git commit --no-verify -m "chore: initial commit"`)
        // Tag the initial commit
        execSync(
          `git tag -a v${version} -m "release v${version} for initial repo creation"`
        )
        resolve()
      } catch (e) {
        log(chalk.red('Failed initial git repo setup'))
        reject(e)
      }
    } else {
      log(chalk.yellow('Git does not appear to be installed'))
      reject(new Error('No git binary found'))
    }
  })
}

module.exports = {
  canUseGit,
  commitFirst,
  initGit
}
