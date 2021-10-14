const fs = require('fs')
const rimraf = require('rimraf')

const { populateProject } = require('./populate-project')
const { log, error } = require('./logger')

const tmpDir = `tmp-${Math.floor(Math.random() * 1000000)}`
const tmpFile = `${tmpDir}/testPopulateProject.md`
const mockMd = `
  sample content
  %%APPNAME%%
  more sample content
  %%HOMEPAGE%%
  and yet more content
  (c) %%YEAR%% %%AUTHOR%%
`

describe('populate-project', () => {
  beforeEach(() => {
    // Cleanup the temp
    rimraf.sync(`./${tmpDir}`, {}, () => {
      log(`Could not remove tmp directory (${tmpDir}) before test.`)
    })
  })
  afterEach(() => {
    // Cleanup the temp
    rimraf.sync(`./${tmpDir}`, {}, () => {
      log(`Could not remove tmp directory (${tmpDir}) after test.`)
    })
  })

  it('replaces variables in markdown files', async () => {
    // stub new file
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir)
    }
    fs.writeFileSync(tmpFile, mockMd, (e) => {
      error(e)
      expect(true).toEqual(false) // Force test failure
    })
    // run replacement
    await populateProject({
      root: tmpDir,
      appName: 'mockAppName',
      homepage: 'http://example.com/mockHomepage',
      year: '2000',
      author: 'Lorem Ipsum',
    })
    // load replacement
    const result = fs.readFileSync(tmpFile, 'utf8', (e) => {
      expect(true).toEqual(false) // Force test failure
      error(e)
    })
    expect(result).toMatchSnapshot()
    expect(result.includes('mockAppName'))
    expect(result.includes('http://example.com/mockHomepage'))
  })

  it.skip('logs an error when it cannot replace variables', () => {})
})
