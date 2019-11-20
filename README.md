[![npm version](https://badge.fury.io/js/create-amclin-nextjs-app.svg)](https://www.npmjs.com/create-amclin-nextjs-app) [![Build Status](https://travis-ci.com/amclin/react-project-boilerplate.svg?branch=master)](https://travis-ci.com/amclin/react-project-boilerplate)[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=amclin/react-project-boilerplate)](https://dependabot.com)

![Branch Code Coverage](./coverage/badge-branches.svg) ![Functions Code Coverage](./coverage/badge-functions.svg) ![Lines Code Coverage](./coverage/badge-lines.svg) ![Statements Code Coverage](./coverage/badge-statements.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# create-amclin-nextjs-app

- [Using the generator](#using)
- [Folder Structure of generated projects](./tree/master/templates/default)
- [Contributing to this project](./CONTRIBUTING.md)

This package includes the global command for creating new React projects incorporating [Next.js](https://github.com/zeit/next.js), CICD pipelines, unit testing, quality gates, and code styling. It is useful for ensuring consistent working environments across multiple different applications.

## Using

### The Easy Way

1. Run `npx create-amclin-nextjs-app` or `yarn create amclin-nextjs-app`
2. Create a new empty repo in GitHub with the same project name
3. Push the new local commits up the new remote repo

### The Hard Way

1. Clone this repo to a location on your local system
2. Navigate to the folder where you want to create a new project
3. Run `node ../<path to the boilerplate>/index.js`
4. Create a new empty repo in GitHub with the same project name
5. Push the new local commits up the new remote repo

### Advanced Examples

#### Specify project name
Skip the prompt and specify the project name on the command line:

`npx create-amclin-nextjs-app -- myprojectname`

#### Skip Git repo generation
Skip the process of creating a git repo for the project. **Note:** *this can result in failures as some of the dependencies expect git to be present*:

`npx create-amclin-nextjs-app --no-git`

#### Assume Server-Side-Rendering (SSR)
Skip the question and assume the generated project will need server-side rendering:

`npx create-amclin-nextjs-app --with-ssr`

## Contributing
Help is always appreciated, please log bug reports, features, and fixes. See [Contribution Guidelines](CONTRIBUTING.md) for more on how you can help.
