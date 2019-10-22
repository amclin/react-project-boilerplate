## New Components
This project follows the Atomic Design pattern for components.
* Pages
  * APIs
  * Components
    * Organisms
      * Molecules
        * Atoms
    * Helpers

In a NextJS app, pages are stored under the `/pages/` path and APIs are at `/pages/api`. All other React components are stored in `/components/` following  Atomic Design folder structures.

**Do not create new React components or pages from scratch.** Instead, use the wizard to guide you through the process of stubbing out the necessary files and structures expected for each type of component

## Unit Tests

![Branch Code Coverage](./coverage/badge-branches.svg)
![Functions Code Coverage](./coverage/badge-functions.svg)
![Lines Code Coverage](./coverage/badge-lines.svg)
![Statements Code Coverage](./coverage/badge-statements.svg)

Code coverage for unit tests must remain above 90%. Unit testing is handled using Jest.

Run unit tests via `npm test`.

A coverage report is shown in the inline test results. A browseable coverage report is also output to `./coverage/lcov-report/index.html`

When running unit tests from a CICD pipline, the environment variable `CI` should be set to `true` before executing the test.
`CI=true npm test`

## Code Formatting

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Code styling is managed with [Prettier](https://github.com/prettier/prettier) to reduce churn from developers using different coding styles. Code will be automatically formatted on commit as long as you have run `npm install` after checking out the repo. Rules are exposed to code editors and validation tools using [ESLint](https://www.npmjs.com/package/eslint)

Plugins:

- `eslint` - Defines code linting rules
- `babel-eslint` - Best practices for projects using babel
- `eslint-config-airbnb` - AirBnB rules for React and Prettier
- `eslint-plugin-react` - React-specific rules
- `eslint-plugin-import` - Consistent module import rules
- `eslint-config-prettier` - Turn off ESLint rules that conflict with Prettier
- `eslint-plugin-jsx-a11y` - Ensure developers are considering accessibility when writing code
- `eslint-plugin-react-hooks` - Follow best practices for using React hooks
- `prettier` - opinionated code styling
- `pretty-quick` - format code on commit

To ensure your editor will style code automatically, make sure you have support installed for `.editorconfig` and `.eslint`. For example, VSCode has both plugins for both [editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) that will pick up the respective configuration files and assist you in formatting your code.

## Commit Messages

Commit messages shouldn't be just "_fixing x_" or "_adding y_". They should explain **why** a change was made so that it is useful for future developers looking at the history. Include links to relevant documents or external library bug reports, and include ticket numbers where appropriate.

### Commit Message Syntax

In order to facilitate [automated changelogs and versionsing](#releases) all git commits are expected to follow the [Angular commit syntax](https://gist.github.com/stephenparish/9941e89d80e2bc58a153). This is enforced using `commitlint` triggered by `husky`.

```
<prefix>(<scope>):<subject>

<longer message>

<footer>
```

Valid prefixes:

- `fix`: Bugfixes (avoid mixing bugfixes and features in the same commit)
- `docs`: Documentation
- `feat`: Features and new functionality
- `test`: Adding unit tests without functional code changes
- `style`: Changes to code styling only (eg. single vs double quotes, spaces vs tabs). **Do not confuse this with CSS styling**
- `refactor`: Internal changes (non-functional) only. Should have no changes to unit tests
- `chore`: Project maintenance

**When a commit contains a breaking change, the footer must begin with: `BREAKING CHANGE:`** so that release versions can properly reflect semantic versioning rules. Breaking changes should also document what other developers will need to do in order to accomidate the change. Breaking changes are those that are not backwards compatible, and change how this project is consumed (APIs, paths to includable libraries, run commands, etc).

#### Skipping CICD pipelines

Automated CICD Pipelines can be skipped on a particular commit by appending the flag `[skip-ci]`. This normally should only be done when the pipelines themselves make commits in order to prevent runaway builds.

## Releases

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
This project follows [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning) guidelines for release numbers.

New versions of the project are automaticaly released via the CI/CD pipeline, which runs Semantic Release via the command `npm run semantic-release`

This automates several tasks in the release process via plugins:

- `@semantic-release/commit-analyzer` - Analyzes commit syntax to determine versioning and changelog
- `@semantic-release/release-notes-generator` - Builds the release notes from the commit messages
- `@semantic-release/changelog` - Generates changelog
- `@semantic-release/git` - Tags the releaase in the git repo
- `@semantic-release/github` - Adds a release version and changelog notes to a GitHub project
- `@semantic-release/npm` - Updates the version number in package.json (and pushes to NPM if `npmPublish` is not set to `false`)
