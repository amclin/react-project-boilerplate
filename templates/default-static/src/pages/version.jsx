import React from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const paths = ['/index.html', 'example/second-page.html', 'version.html']
const versionResponse = {
  appEnv: publicRuntimeConfig.appEnv,
  paths
}

const VersionPage = () => {
  return (
    <div data-testid="version-json" id="version-json">
      {JSON.stringify(versionResponse)}
    </div>
  )
}

export default VersionPage
