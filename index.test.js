const { execSync } = require('child_process')
const rimraf = require('rimraf')
const { log, error } = require('./helpers/logger')

// TODO: Jest can't process coverage of spaned processes
// May need to wrap NYC to get the coverage of all the
// code executed here

describe('Integration', () => {
  beforeEach(() => {
    // Cleanup the temp
    rimraf.sync('./tmp', {}, () => {
      log('No tmp directory to remove.')
    })
  })

  it('Can generate a new project from the default template', async () => {
    // Run the generator expecting successful STDOUT
    try {
      await execSync('node ./index.js --no-git -- tmp', { stdio: 'inherit' })
    } catch (e) {
      error('Failed to complete generation process.')
      expect(true).toEqual(false) // Force test failure
    }
    // Generated app should be buildable
    try {
      await execSync('(cd tmp ; npm run build)', { stdio: 'inherit' })
    } catch (e) {
      error('Generated app failed to build with `npm run build`')
      expect(true).toEqual(false) // Force test failure
    }
    // Generated app should be exportable
    try {
      await execSync('(cd tmp ; npm run export)', { stdio: 'inherit' })
    } catch (e) {
      error('Generated app failed to export with `npm run export`')
      expect(true).toEqual(false) // Force test failure
    }
    // Cleanup the temp which verifies the tmp folder got populated
    rimraf.sync('./tmp', {}, () => {
      error('No tmp directory to remove.')
      expect(true).toEqual(false) // Force test failure
    })
  })
})
