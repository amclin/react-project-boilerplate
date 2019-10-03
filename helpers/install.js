const chalk = require('chalk')
const spawn = require('cross-spawn')
const { log } = require('./logger')

const install = (
  root,
  dependencies = null,
  { useYarn, isOnline, devDependencies = false }
) => {
  return new Promise((resolve, reject) => {
    let command = ''
    let args = []
    if (useYarn) {
      command = 'yarnpkg'
      args = dependencies ? ['add', '--exact'] : ['install']
      if (!isOnline) {
        args.push('--offline')
      }
      if (dependencies) {
        args.push(...dependencies)
      }
      args.push('--cwd', root)

      if (!isOnline) {
        log(chalk.yellow('You appear to be offline.'))
        log(chalk.yellow('Falling back to the local Yarn cache.'))
        log()
      }
    } else {
      command = 'npm'
      const saveCommand = devDependencies ? '--save-dev' : '--save'
      args = [
        'install',
        dependencies && saveCommand,
        dependencies && '--save-exact',
        '--loglevel',
        'error'
      ]
        .filter(Boolean)
        .concat(dependencies || [])
    }

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' }
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Failed to install dependencies using ${command}`))
        return
      }
      resolve()
    })
  })
}

module.exports = {
  install
}
