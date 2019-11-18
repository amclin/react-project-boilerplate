#!/usr/bin/env node
const chalk = require('chalk')
const Commander = require('commander')
const path = require('path')
const prompts = require('prompts')
const checkForUpdate = require('update-check')

const { createApp } = require('./create-app')
const { validateNpmName } = require('./helpers/validate-pkg')
const packageJson = require('./package.json')
const { shouldUseYarn } = require('./helpers/should-use-yarn')
const { log, error } = require('./helpers/logger')

let projectPath = ''

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectPath = name
  })
  .option('--use-npm')
  .option('--no-git', 'skip git creation and commits')
  .option(
    '--with-ssr',
    'the generated project will have React server-side rendering'
  )
  .option(
    '-e, --example <example-path>',
    'an example to bootstrap the app with'
  )
  .allowUnknownOption()
  .parse(process.argv)

async function run() {
  const questions = []
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }

  if (!projectPath) {
    questions.push({
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: name => {
        const validation = validateNpmName(path.basename(path.resolve(name)))
        if (validation.valid) {
          return true
        }
        return `Invalid project name: ${validation.problems[0]}`
      }
    })
  }

  if (!program.withSsr) {
    questions.push({
      type: 'confirm',
      name: 'isStatic',
      message:
        'Is this app a statically-generated site? (For server-side-rendering choose No)',
      initial: true
    })
  }

  const defaultGitUrl = 'git+ssh://git@github.com/example/example.git'
  if (program.git) {
    questions.push({
      type: 'text',
      name: 'gitUrl',
      message: 'Please provide the full URL used to clone the git repo:',
      initial: defaultGitUrl
    })
  }

  const res = await prompts(questions)

  if (typeof res.path === 'string') {
    projectPath = res.path.trim()
  }

  if (!projectPath) {
    log()
    log('Please specify the project directory:')
    log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`)
    log()
    log('For example:')
    log(`  ${chalk.cyan(program.name())} ${chalk.green('my-next-app')}`)
    log()
    log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`)
    process.exit(1)
  }

  const resolvedProjectPath = path.resolve(projectPath)
  const projectName = path.basename(resolvedProjectPath)

  const { valid, problems } = validateNpmName(projectName)
  if (!valid) {
    error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    )

    problems.forEach(p => error(`    ${chalk.red.bold('*')} ${p}`))
    process.exit(1)
  }

  await createApp({
    appPath: resolvedProjectPath,
    useNpm: !!program.useNpm,
    noGit: !program.git,
    isStatic: program.withSsr ? !program.withSsr : res.isStatic,
    gitRemote: program.git ? res.gitUrl : defaultGitUrl,
    example:
      typeof program.example === 'string' && program.example.trim()
        ? program.example.trim()
        : undefined
  })
}

const update = checkForUpdate(packageJson).catch(() => null)

async function notifyUpdate() {
  try {
    const res = await update
    if (res && res.latest) {
      const isYarn = shouldUseYarn()

      log()
      log(
        chalk.yellow.bold(
          'A new version of `create-amclin-nextjs-app` is available!'
        )
      )
      log(`
        You can update by running:
          ${chalk.cyan(
            isYarn
              ? 'yarn global add create-amclin-nextjs-app'
              : 'npm i -g create-amclin-nextjs-app'
          )}
      `)
      log()
      log(
        `But an even better option is to globally uninstall and in the future run:`
      )
      log(chalk.cyan()` npx create-amclin-nextjs-app`)
      log(`That way you'll always have the latest.`)
    }
  } catch (e) {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async reason => {
    log()
    log('Aborting installation.')
    if (reason.command) {
      log(`  ${chalk.cyan(reason.command)} has failed.`)
    } else {
      log(chalk.red('Unexpected error. Please report it as a bug:'))
      log(reason)
    }
    log()

    await notifyUpdate()

    process.exit(1)
  })
