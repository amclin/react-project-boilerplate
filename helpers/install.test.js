jest.mock('cross-spawn')
const { spawn } = require('cross-spawn')

spawn.mockReturnValue({
  on: jest.fn((event, callback) => {
    callback(0)
  })
})
const { install } = require('./install')

const dependencies = ['mock1', 'mock2']

describe('install', () => {
  describe('install()', () => {
    describe('npm environment', () => {
      const defaults = {
        dependencies,
        useYarn: false,
      }
      it('can install a list of primary dependencies', () => install(defaults).then(() => {
          expect(spawn).toBeCalledWith(
            'npm',
            ['install', '--save', '--loglevel', 'error',  ...dependencies],
            expect.objectContaining({ stdio: "inherit" }))
        }))
      it('can install a list of devDependencies', () => install({ ...defaults, devDependencies: true }).then(() => {
          expect(spawn).toBeCalledWith(
            'npm',
            ['install', '--save-dev', '--loglevel', 'error',  ...dependencies],
            expect.objectContaining({ stdio: "inherit" }))
        }))
      it('can run project install command', () => install({ ...defaults, dependencies: undefined }).then(() => {
          expect(spawn).toBeCalledWith(
            'npm',
            ['install', '--loglevel', 'error'],
            expect.objectContaining({ stdio: "inherit" }))
        })) 
    })
    describe('yarn environment', () => {
      const defaults = {
        root: 'mockRoot',
        dependencies,
        useYarn: true,
        isOnline: true
      }
      const root = 'mockRoot'
      it('can install a list of primary dependencies', () => install(defaults).then(() => {
          expect(spawn).toBeCalledWith(
            'yarn',
            ['add', ...dependencies, '--cwd', root],
            expect.objectContaining({ stdio: "inherit" }))
        }))
      it('can install a list of devDependencies', () => install({ ...defaults, devDependencies: true }).then(() => {
          expect(spawn).toBeCalledWith(
            'yarn',
            ['add', '--dev', ...dependencies, '--cwd', root],
            expect.objectContaining({ stdio: "inherit" }))
        }))
      it('can run project install command', () => install({ ...defaults, dependencies: undefined }).then(() => {
          expect(spawn).toBeCalledWith(
            'yarn',
            ['install', '--cwd', root],
            expect.objectContaining({ stdio: "inherit" }))
        }))
      it('can specify that Yarn runs in offline mode', () => install({ ...defaults, dependencies: undefined, isOnline: false }).then(() => {
          expect(spawn).toBeCalledWith(
            'yarn',
            ['install', '--offline', '--cwd', root],
            expect.objectContaining({ stdio: "inherit" }))
        }))
    })
    it('handles errors in the spawned process by rejecting a promise', () => new Promise((resolveTest, rejectTest) => {
        // Mock the spawned process failing
        spawn.mockReturnValueOnce({
          on: jest.fn((event, callback) => {
            callback(1)
          })
        })
        install({ dependencies, devDependencies: true })
          .then(() => {
            // Process succeeded, so the test should fail
            expect('Process Failed').toEqual('Process Succeeded')
            rejectTest()
          })
          .catch(() => {
            // Process failed, so the test should pass
            expect('Process Failed').toEqual('Process Failed')
            resolveTest()
          })
      }))
  })
})
