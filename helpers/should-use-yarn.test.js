const childProcess = require('child_process')
const { shouldUseYarn } = require('./should-use-yarn')

jest.mock('child_process')

describe('should-use-yarn', () => {
  it('returns true when the system has yarn installed', () => {
    childProcess.execSync.mockImplementationOnce(() => true)
    expect(shouldUseYarn()).toEqual(true)
  })
  it('returns false when the system has an error or yarn is not installed', () => {
    childProcess.execSync.mockImplementationOnce(() => { throw new Error('mock error') })
    expect(shouldUseYarn()).toEqual(false)
  })
})
