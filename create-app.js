const chalk = require('chalk')
const fs = require('fs')
const makeDir = require('make-dir')
const os = require('os')
const path = require('path')
const merge = require('deepmerge')
const userName = require('git-user-name')

const { downloadAndExtractExample } = require('./helpers/examples')
const { copyTemplateFiles } = require('./helpers/copy-template-files')
const { hasExample } = require('./helpers/examples')
const { install } = require('./helpers/install')
const { isFolderEmpty } = require('./helpers/is-folder-empty')
const { getOnline } = require('./helpers/is-online')
const { shouldUseYarn } = require('./helpers/should-use-yarn')
const { initGit, commitFirst } = require('./helpers/init-git')
const { populateProject } = require('./helpers/populate-project')
const { log, error } = require('./helpers/logger')

const templateSettings = require('./templates/default.json')
const ssrTemplateSettings = require('./templates/default-ssr.json')
const staticTemplateSettings = require('./templates/default-static.json')

const createApp = async ({
  appPath,
  example,
  gitRemote,
  isStatic,
  noGit = false,
  useNpm,
}) => {
  const root = path.resolve(appPath)
  const appName = path.basename(root)

  if (example) {
    const found = await hasExample(example)
    if (!found) {
      error(
        `Could not locate an example named ${chalk.red(
          `"${example}"`
        )}. Please check your spelling and try again.`
      )
      process.exit(1)
    }
  }

  const version = '0.1.0'

  await makeDir(root)
  if (!isFolderEmpty(root, appName)) {
    process.exit(1)
  }

  const useYarn = useNpm ? false : shouldUseYarn()
  const isOnline = !useYarn || (await getOnline())
  const originalDirectory = process.cwd()

  const displayedCommand = useYarn ? 'yarn' : 'npm'
  log(`Creating a new Next.js app in ${chalk.green(root)}.`)
  log()

  await makeDir(root)
  process.chdir(root)

  const homepage = `https://github.com/amclin/${appName}`
  const author = userName()
  const year = new Date().getFullYear()

  if (noGit) {
    log(`Skipping creation of git repository.`)
    log()
  } else {
    log(`Initializing git repository.`)
    log()
    await initGit(root, { gitRemote })
  }

  if (example) {
    log(
      `Downloading files for example ${chalk.cyan(
        example
      )}. This might take a moment.`
    )
    log()
    await downloadAndExtractExample(root, example)

    log('Installing packages. This might take a couple of minutes.')
    log()

    await install({
      root,
      useYarn,
      isOnline,
    })
    log()
  } else {
    const packageJson = merge(
      {
        ...templateSettings.package,
        name: `${appName}`,
        version,
        author,
        private: true,
        repository: {
          type: 'git',
          url: gitRemote,
        },
        homepage,
        bugs: {
          url: `${homepage}/issues`,
        },
      },
      isStatic ? staticTemplateSettings.package : ssrTemplateSettings.package
    )

    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )

    log(`Installing runtime dependencies using ${displayedCommand}:`)
    templateSettings.dependencies.forEach((dep) => {
      log(`  * ${chalk.cyan(dep)}`)
    })
    log()

    await install({
      root,
      dependencies: templateSettings.dependencies,
      useYarn,
      isOnline,
    })
    log()

    log(`Installing dev dependencies using ${displayedCommand}:`)
    templateSettings.devDependencies.forEach((dep) => {
      log(`  * ${chalk.cyan(dep)}`)
    })
    log()

    await install({
      root,
      dependencies: templateSettings.devDependencies,
      useYarn,
      isOnline,
      devDependencies: true,
    })
    log()

    await copyTemplateFiles(root, 'default')

    // For sites with server-side React (not staticly generated)
    // We need a different docker file and different build
    // instructions
    await copyTemplateFiles(root, isStatic ? 'default-static' : 'default-ssr')

    await populateProject({ root, appName, homepage, author, year })
  }

  if (noGit) {
    log(`Skipping initial commit to git repository.`)
    log()
  } else {
    log(`Committing to the git repository.`)
    log()
    await commitFirst({ version })
  }

  let cdpath = ''
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName
  } else {
    cdpath = appPath
  }

  log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)
  log('Inside that directory, you can run several commands:')
  log()
  log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}dev`))
  log('    Starts the development server.')
  log()
  log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
  log('    Builds the app for production.')
  log()
  log(chalk.cyan(`  ${displayedCommand} start`))
  log('    Runs the built app in production mode.')
  log()
  log('We suggest that you begin by typing:')
  log()
  log(chalk.cyan(`  cd ${cdpath}`))
  log(`  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`)
  log()
  log()
  if (!noGit) {
    log(`-GitHub----------------------------------------
A git repo is created, but changes have not been
pushed to the remote git server. Make sure an
empy repo exists at:
  ${chalk.cyan(gitRemote)}
and then run the onetime command:
  ${chalk.cyan('git push --follow-tags push')}`)
    log(`-----------------------------------------------`)
  }
}

module.exports = {
  createApp,
}
