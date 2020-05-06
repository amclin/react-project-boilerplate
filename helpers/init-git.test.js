jest.mock('child_process')
const { execSync } = require('child_process')
const { initGit, canUseGit, commitFirst } = require('./init-git')

describe('init-git', () => {
  describe('canUseGit()', () => {
    it('returns true if the git cli is available', () => {
      execSync.mockReturnValueOnce(true)
      expect(canUseGit()).toEqual(true)
    })
    it('returns false if git cli is not available', () => {
      execSync.mockImplementationOnce(() => { throw new Error('git not available') })
      expect(canUseGit()).toEqual(false)
    })
  })
  describe('initGit()', () => {
    beforeAll(() => {
      execSync.mockReturnValue(true)
      initGit('./',{ gitRemote: 'git+https://example.com'})
    })
    it('initializes the git repo', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git init`))
    })
    it('adds a remote origin', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git remote add origin git+https://example.com`))
    })
    it('adds a remote origin', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git remote add origin`))
    })
  })
  describe('commitFirst()', () => {
    const version = 'mock-tag'
    beforeAll(async () => {
      execSync.mockReturnValue(true)
      await commitFirst({ version })
    })
    it('adds all files to the git stage', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git add .`))
    })
    it('adds the code coveragfe badges to the git stage', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git add coverage/badge-*.svg -f`))
    })
    it('makes an initial commit to the git repo', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git commit --no-verify -m "chore: initial commit`))
    })
    it('tags the commit with an initial version', () => {
      expect(execSync).toBeCalledWith(expect.stringContaining(`git tag -a v${version} -m "release v${version} for initial repo creation"`))
    })
    it('rejects a promise when git cli can\'t be detected.', async () => {
      execSync.mockImplementationOnce(() => { throw new Error('git not available') })
      let result = true
      await commitFirst({ version }).catch(() => {
        result = false
      })
      expect(result).toEqual(false)
    })
    it.skip('rejects a promise when git errors', async () => {
      canUseGit.mockImplementationOnce(() => true)
      execSync.mockImplementationOnce(() => { throw new Error('git fails') })
      let result = true
      await commitFirst({ version }).catch(() => {
        result = false
      })
      expect(result).toEqual(false)
    })
  })
})