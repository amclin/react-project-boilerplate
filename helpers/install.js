const chalk = require('chalk')
const spawn = require('cross-spawn')
const { log } = require('./logger')

const buildYarnCommand = ({dependencies, isOnline, root, devDependencies}) => {
  const command = 'yarn'
  const args = dependencies ? ['add'] : ['install']
  if(devDependencies) {
    args.push('--dev')
  }

  if (!isOnline) {
    args.push('--offline')
    log(chalk.yellow('You appear to be offline.'))
    log(chalk.yellow('Falling back to the local Yarn cache.'))
    log()
  }
  if (dependencies) {
    args.push(...dependencies)
  }
  args.push('--cwd', root)

  return {
    args,
    command
  }
}

const buildNpmCommand = ({dependencies, devDependencies}) => {
  const command = 'npm'
  const saveCommand = devDependencies ? '--save-dev' : '--save'
  const args = [
    'install',
    dependencies && saveCommand,
    '--loglevel',
    'error'
  ]
    .filter(Boolean)
    .concat(dependencies || [])

  return {
    args,
    command
  }
}

const install = ({
  root,
  dependencies = null,
  useYarn,
  isOnline,
  devDependencies = false
}) => {
  return new Promise((resolve, reject) => {
    const buildCommand = (useYarn) ? buildYarnCommand : buildNpmCommand
    const {command, args} = buildCommand({dependencies, devDependencies, isOnline, root})

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
