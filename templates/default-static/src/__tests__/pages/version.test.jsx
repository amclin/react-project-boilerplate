import React from 'react'
import { render } from '@testing-library/react'
import VersionPage from '../../pages/version'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    appEnv: 'TEST'
  }
}))

describe('Pages:Version', () => {
  it('renders the version page', () => {
    const { asFragment, getByTestId } = render(<VersionPage />)
    const versionObj = JSON.parse(getByTestId('version-json').textContent)

    expect(versionObj.appEnv).toBe('TEST')
    expect(asFragment()).toMatchSnapshot()
  })
})
