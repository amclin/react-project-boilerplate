## Releases
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
This project follows [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning) guidelines for release numbers.

New versions of the project are automaticaly released via the CI/CD pipeline, which runs Semantic Release via the command `npm run semantic-release`

This automates several tasks in the release process via plugins:
* `@semantic-release/commit-analyzer` - Analyzes commit syntax to determine versioning and changelog
* `@semantic-release/release-notes-generator` - Builds the release notes from the commit messages
* `@semantic-release/changelog` - Generates changelog
* `@semantic-release/git` - Tags the releaase in the git repo
* `@semantic-release/github` - Adds a release version and changelog notes to a GitHub project
* `@semantic-release/npm` - Updates the version number in package.json (and pushes to NPM if `npmPublish` is not set to `false`)

