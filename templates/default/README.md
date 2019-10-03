<!-- //TODO: Wire this up to the project-specific build status path for Gitlab? -->
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

### Running Dev Mode

Run `npm run dev` to launch a NextJS development webserver at `http://localhost:3000`

### Production Mode

#### Static Sites

To run a static site, deploy the contents of the `/build` folder to a webserver. This of course necessitates having run `npm run build` first to get a statically-generated site

#### Server-Side Rendering (SSR)

To run a site with Server-Side Rendering, make sure the package is checked out and installed on a suitable NodeJS, NextJS, or serverless environment, and then run `npm start` (`npm run build` needs to have happened first ). See [NextJS documentation for more details](https://nextjs.org/docs#production-deployment).
