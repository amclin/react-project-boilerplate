// End-to-end Integration Test
const fs = require('fs')
const { execSync } = require('child_process')
const rimraf = require('rimraf')
const { error } = require('./helpers/logger')

// TODO: Once nyc major version 15 is released, update to that version and make any necessary code
// adjustments to accommodate breaking changes (if applicable). Current version of nyc
// relies on npm module spawn-wrap and has issues with edge cases when used in this particular
// manner - particularly on Windows runtimes: https://github.com/facebook/jest/issues/5274#issuecomment-554657586 

// Discussion thread: https://github.com/amclin/react-project-boilerplate/issues/28
const WORKAROUND_PREPEND = 'nyc --reporter none';

describe('Integration Test', () => {
describe('Generated App', () => {
  beforeAll( async () => {
    // Run the generator expecting successful STDOUT
    try {
      // Interim workaround: https://github.com/facebook/jest/issues/3190#issuecomment-354758036
      await execSync(`${WORKAROUND_PREPEND} node ./index.js --use-npm --no-git --with-ssr -- tmp`, { stdio: 'inherit' })
    } catch (e) {
      error('Failed to complete generation process.', e)
      expect(true).toEqual(false) // Force test failure
    }
  })
  afterAll(() => {
    // Cleanup the temp
    rimraf.sync('./tmp', {}, () => {
      error('No tmp directory to remove.')
      expect(true).toEqual(false) // Force test failure
    })
  })

  it('can build', async () => {
    // Generated app should be buildable
    try {
      await execSync('(cd tmp ; npm run build)', { stdio: 'inherit' })
    } catch (e) {
      error('Generated app failed to build with `npm run build`', e)
      expect(true).toEqual(false) // Force test failure
    }
  })

  it('can export static html', async () => {
    // Generated app should be exportable
    try {
      await execSync('(cd tmp ; npm run export)', { stdio: 'inherit' })
    } catch (e) {
      error('Generated app failed to export with `npm run export`', e)
      expect(true).toEqual(false) // Force test failure
    }
  })

  describe('New component wizard(plop)', () => {
    const componentTypes = {
      atom: {
        files: [
          'index.js',
          'MockComponent.jsx',
          'MockComponent.test.jsx'
        ]
      },
      molecule: {
        files: [
          'index.js',
          'MockComponent.jsx',
          'MockComponent.test.jsx'
        ]
      },
      organism: {
        files: [
          'index.js',
          'MockComponent.jsx',
          'MockComponent.test.jsx'
        ]
      }
    }

    // Loop through each type of component and test the files are created
    Object.entries(componentTypes).forEach(([componentType, data]) => {
      it(`can generate new ${componentType}s through the wizard`, async() => {
        const path = `tmp/src/components/${componentType}s/MockComponent`
        const cmd = `(cd tmp; npm run generate -- component ${componentType} "mock component" "short description")`

        try {
          await execSync(cmd)
        } catch (e) {
          error(`Failed to run plop for a ${componentType}`, e)
          expect(true).toEqual(false) // Force test failure
        }

        // Check that all expected files are generated
        data.files.forEach((file) => {
          expect(fs.readFileSync(`${path}/${file}`, 'utf-8')).toMatchSnapshot()
        })
      })
    })

    it.skip('can generate new pages through the wizard', async () => {})
    it.skip('can generate new apis through the wizard', async () => {})
  })
})
})
