import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const paths = ['/index', 'example/second-page', 'api/version']
const versionResponse = {
  appEnv: publicRuntimeConfig.appEnv,
  paths
}

// eslint-disable-next-line
export default (req, res) => {
  res.status(200).json(versionResponse)
}
