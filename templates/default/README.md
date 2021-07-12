<!-- //TODO: Wire this up to the project-specific build status path for Gitlab? -->
<!-- [![npm version](https://badge.fury.io/js/%40amclin%2Fcreate-react-app.svg)](https://www.npmjs.com/@amclin/create-react-app) -->
<!-- [![Build Status](https://travis-ci.org/amclin/react-project-boilerplate.svg?branch=master)](https://travis-ci.org/amclin/react-project-boilerplate) -->

![Branch Code Coverage](./coverage/badge-branches.svg) ![Functions Code Coverage](./coverage/badge-functions.svg) ![Lines Code Coverage](./coverage/badge-lines.svg) ![Statements Code Coverage](./coverage/badge-statements.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# %%APPNAME%%

This is a boilerplate React project incorporating NextJS, CICD pipelines, unit testing, quality gates, and code styling. It is useful for ensuring consistent working environments across multiple different applications.

- [Running](#running)
- [Contributing](CONTRIBUTING.md)

## Running

### Dependencies

After checking out this repo, run `npm install` to install dependencies

### Running in Dev Mode

Run `npm run dev` to launch a NextJS development webserver at `http://localhost:3000`

### Running in Production Mode

For convenience and consistency, the preferred method of running in produciton mode is to use Docker. This will best match how an application is running on a shared environment.

#### Build a Docker image

Create a Docker image from your current source code by running:

`npm run docker`

**Warning** You must have Docker Desktop or similar Docker daemon installed and running or the script will fail.

#### Run a Docker Container

Once the Docker image exists in your registry of choice (local or remote), you can then run the app and specify what port it should run on:

```
docker run -p 0.0.0.0:3000:3000 %%APPNAME%%:latest
```

If you'd like to run on a different port, replace the first `3000` with the desired port.

#### Alternative "local" production mode

Alternatively the application can be run locally without using Docker. See [NextJS documentation for more details](https://nextjs.org/docs#production-deployment).

## Contributing

Add new components and features using `npm run generate`. See [Contributing New Components](CONTRIBUTING.md#new-components) for more details.
