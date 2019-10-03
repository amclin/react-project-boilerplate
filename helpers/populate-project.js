const replace = require('replace-in-file')
const { log, error } = require('./logger')

const populateProject = async ({ root, appName, homepage }) => {
  let results = false

  const options = {
    files: [`${root}/**/*.md`],
    from: [/%%APPNAME%%/g, /%%HOMEPAGE%%/g],
    to: [appName, homepage]
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
