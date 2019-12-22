const fs = require('fs');
const dotenv = require('dotenv');
// dotenvExpand allows you to use ${} inside process.env variables. ex: URL=http://${HOST}:${PORT}
const dotenvExpand = require('dotenv-expand');

// eslint-disable-next-line
const APP_ENV = process.env.APP_ENV;
const appDirectory = fs.realpathSync(process.cwd());

// The order of loading files is:
// 1. Local overrides (.env.local)
// 2. Env specific (ie. .env.production)
// 3. Default (.env)
const dotenvFiles = [
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  APP_ENV !== 'test' && `${appDirectory}/.env.local`,
  `${appDirectory}/.env.${APP_ENV}`,
  `${appDirectory}/.env`,
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      })
    );
  }
});
