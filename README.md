# THIS PROJECT IS ARCHIVED AND NO LONGER SUPPORTED #
It is a good reference for how to build a generator for new NextJS projects. But it is out of date with an older version of NextJS and various dependencies. Please see the reference implementations that NextJS provides for more modern solutions.

[![npm version](https://badge.fury.io/js/create-amclin-nextjs-app.svg)](https://www.npmjs.com/create-amclin-nextjs-app)
![Build Status](https://github.com/amclin/react-project-boilerplate/workflows/Run%20Tests/badge.svg)

![Branch Code Coverage](./coverage/badge-branches.svg) ![Functions Code Coverage](./coverage/badge-functions.svg) ![Lines Code Coverage](./coverage/badge-lines.svg) ![Statements Code Coverage](./coverage/badge-statements.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

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

Skip the process of creating a git repo for the project. **Note:** _this can result in failures as some of the dependencies expect git to be present_:

`npx create-amclin-nextjs-app --no-git`

#### Assume Server-Side-Rendering (SSR)

Skip the question and assume the generated project will need server-side rendering:

`npx create-amclin-nextjs-app --with-ssr`

## Environmental Configs (.env file)

The logic is located in `next.config.js`. You may use a `.env` file to provide environemntal variables, or you may use them from the commandline `ENV_VARIABLE=X <your_command>`.

## Contributing

Help is always appreciated, please log bug reports, features, and fixes. See [Contribution Guidelines](CONTRIBUTING.md) for more on how you can help.
