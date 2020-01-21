import http from 'http'
import fetch from 'isomorphic-unfetch'
import listen from 'test-listen'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import versionHandler from '../../../pages/api/version'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    appEnv: 'TEST'
  }
}))

describe('/api/version handler', () => {
  it('responds with 200 and version info', async () => {
    const requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, versionHandler)
    }
    const server = http.createServer(requestHandler)
    const url = await listen(server)
    const response = await fetch(url)
    const versionObj = JSON.parse(await response.text())

    expect(response.status).toBe(200)
    expect(versionObj.appEnv).toBe('TEST')
    expect(versionObj.paths).toBeTruthy()
    return server.close()
  })
})
