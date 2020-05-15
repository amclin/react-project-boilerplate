jest.mock('validate-npm-package-name')
const validateNpmPackageName = require('validate-npm-package-name')
const { validateNpmName } = require('./validate-pkg')

describe('validate-package', () => {
  describe('validateNpmName()', () => {
    it('checks the validity of the provided package name', () => {
      const mockName = 'foobarpackage'
      validateNpmPackageName.mockReturnValueOnce({ validForNewPackages: true })
      validateNpmName(mockName)
      expect(validateNpmPackageName).toHaveBeenCalledWith(
        expect.stringMatching(mockName)
      )
    })
    it('returns a list of errors and warnings when the name is invalid', () => {
      const mockName = 'foobarpackage'
      const problems = {
        errors: ['error 1', 'error 2', 'error 3'],
        warnings: ['warning 1', 'warning 2', 'warning 3'],
      }
      validateNpmPackageName.mockReturnValueOnce({
        validForNewPackages: false,
        ...problems,
      })
      const result = validateNpmName(mockName)
      expect(result.valid).toEqual(false)
      expect(result.problems).toEqual(problems.errors.concat(problems.warnings))
      validateNpmPackageName.mockReturnValueOnce({ validForNewPackages: false })
      const result2 = validateNpmName(mockName)
      expect(result2.valid).toEqual(false)
      expect(result2.problems).toEqual([])
    })
  })
})
