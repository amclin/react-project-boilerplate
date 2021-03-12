const cpy = require('cpy')
const path = require('path')

const copyTemplateFiles = (root, dir) =>
  cpy(['**', '.dependabot/**', '.husky/**'], root, {
    parents: true,
    cwd: path.join(__dirname, '..', 'templates', dir),
    rename: (name) => {
      const dotFiles = [
        'babelrc',
        'editorconfig',
        'eslintrc.json',
        'gitignore',
        'travis.yml',
      ]
      if (dotFiles.indexOf(name) > -1) {
        return '.'.concat(name)
      }
      return name
    },
  })

module.exports = {
  copyTemplateFiles,
}
