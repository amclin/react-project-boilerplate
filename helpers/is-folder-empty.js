const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { log } = require('./logger')

const isFolderEmpty = (root, name) => {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log'
  ]

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // Support IntelliJ IDEA-based editors
    .filter(file => !/\.iml$/.test(file))

  if (conflicts.length > 0) {
    log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    )
    log()
    conflicts.forEach(file => {
      try {
        const stats = fs.lstatSync(path.join(root, file))
        if (stats.isDirectory()) {
          log(`  ${chalk.blue(file)}/`)
        } else {
          log(`  ${file}`)
        }
      } catch (e) {
        log(`  ${file}`)
      }
    })
    log()
    log(
      'Either try using a new directory name, or remove the files listed above.'
    )
    log()
    return false
  }

  return true
}

module.exports = {
  isFolderEmpty
}
