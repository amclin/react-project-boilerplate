const got = require('got')
const promisePipe = require('promisepipe')
const tar = require('tar')

const hasExample = async name => {
  const res = await got(
    `https://api.github.com/repos/zeit/next.js/contents/examples/${encodeURIComponent(
      name
    )}/package.json`
  ).catch(e => e)
  return res.statusCode === 200
}

const downloadAndExtractExample = async (root, name) => promisePipe(
    got.stream('https://codeload.github.com/zeit/next.js/tar.gz/canary'),
    tar.extract({ cwd: root, strip: 3 }, [`next.js-canary/examples/${name}`])
  )

module.exports = {
  hasExample,
  downloadAndExtractExample
}
