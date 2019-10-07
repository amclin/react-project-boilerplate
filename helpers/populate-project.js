const replace = require('replace-in-file')
const { log, error } = require('./logger')

const populateProject = async ({ root, appName, homepage, author, year }) => {
  let results = false

  const options = {
    ignore: [`${root}/node_modules/**/*`],
    files: [`${root}/**/*`],
    from: [/%%APPNAME%%/g, /%%HOMEPAGE%%/g, /%%AUTHOR%%/, /%%YEAR%%/],
    to: [appName, homepage, author, year]
  }

  try {
    results = await replace(options)
    log('Filled in project details')
  } catch (e) {
    error(`Could not fill in project details:`, e)
  }

  return !!results
}

module.exports = {
  populateProject
}
