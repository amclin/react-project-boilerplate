# [2.2.0](https://github.com/amclin/react-project-boilerplate/compare/v2.1.0...v2.2.0) (2019-10-09)


### Bug Fixes

* unit tests were preventing apps from building ([f8b9ba0](https://github.com/amclin/react-project-boilerplate/commit/f8b9ba04f90b4cda2d8a80c5681dc53f15511754)), closes [#12](https://github.com/amclin/react-project-boilerplate/issues/12)


### Features

* **next:** add `npm export` command for generating static sites ([0a94ba1](https://github.com/amclin/react-project-boilerplate/commit/0a94ba11f9494bfc5f0f07a60ea977f9d5f3f728)), prerequisite for [#8](https://github.com/amclin/react-project-boilerplate/issues/8) [#10](https://github.com/amclin/react-project-boilerplate/issues/10)

# [2.1.0](https://github.com/amclin/react-project-boilerplate/compare/v2.0.3...v2.1.0) (2019-10-07)


### Bug Fixes

* getting year was failing when generating license file ([b590025](https://github.com/amclin/react-project-boilerplate/commit/b590025))
* incorrect instructions shown when global install was out of date ([ba011b2](https://github.com/amclin/react-project-boilerplate/commit/ba011b2))
* populating templates sometimes fails from too many open files ([940effe](https://github.com/amclin/react-project-boilerplate/commit/940effe))
* post-run instructions were missing created path ([3499607](https://github.com/amclin/react-project-boilerplate/commit/3499607))


### Features

* populate copyright info in generated license ([724f850](https://github.com/amclin/react-project-boilerplate/commit/724f850))
* **components:** <Favicon> atomic molecule with sample favicons ([0ddff76](https://github.com/amclin/react-project-boilerplate/commit/0ddff76))
* **components:** <GlobalHead> organism for reusable document head tags ([5d35445](https://github.com/amclin/react-project-boilerplate/commit/5d35445))
* **components:** <HeadLink> as atomic design atom example ([f6d54c4](https://github.com/amclin/react-project-boilerplate/commit/f6d54c4))
* **components:** <Manifest> component for PWAs with sample manifest ([cb452b3](https://github.com/amclin/react-project-boilerplate/commit/cb452b3))
* **template:** provide better folder pattern for page routing ([dfcf3d1](https://github.com/amclin/react-project-boilerplate/commit/dfcf3d1))

## [2.0.3](https://github.com/amclin/react-project-boilerplate/compare/v2.0.2...v2.0.3) (2019-10-04)


### Bug Fixes

* ./helpers/ is missing ([15376b3](https://github.com/amclin/react-project-boilerplate/commit/15376b3))

## [2.0.2](https://github.com/amclin/react-project-boilerplate/compare/v2.0.1...v2.0.2) (2019-10-04)


### Bug Fixes

* **ci:** npm-suitable public project name ([e6d6708](https://github.com/amclin/react-project-boilerplate/commit/e6d6708))

## [2.0.1](https://github.com/amclin/react-project-boilerplate/compare/v2.0.0...v2.0.1) (2019-10-04)


### Bug Fixes

* **ci:** allow public release ([4d1965a](https://github.com/amclin/react-project-boilerplate/commit/4d1965a))

# [2.0.0](https://github.com/amclin/react-project-boilerplate/compare/v1.4.1...v2.0.0) (2019-10-04)


### Bug Fixes

* **ci:** restore missing travis config ([ca2360b](https://github.com/amclin/react-project-boilerplate/commit/ca2360b))


### Features

* **template:** namespace generated project ([c18b7be](https://github.com/amclin/react-project-boilerplate/commit/c18b7be))
* ensure linting on commit ([f9efa59](https://github.com/amclin/react-project-boilerplate/commit/f9efa59))
* scripted wizard ([9806de8](https://github.com/amclin/react-project-boilerplate/commit/9806de8))
* support releasing to npm ([89326e2](https://github.com/amclin/react-project-boilerplate/commit/89326e2))


### BREAKING CHANGES

*   formerly:
    1. clone repo
    2. manually alter package.json, readme, etc
    3. Bind and push to a new repo
    4. Unbind from the boilerplate repo
  now:
    1. run `npx @amclin/react-project-boilerplate`

## [1.4.1](https://github.com/amclin/react-project-boilerplate/compare/v1.4.0...v1.4.1) (2019-10-02)


### Bug Fixes

* **ci:** correct syntax for travis release commands ([ff94f49](https://github.com/amclin/react-project-boilerplate/commit/ff94f49))
* **ci:** travis should update coverage badges ([4cdb2cf](https://github.com/amclin/react-project-boilerplate/commit/4cdb2cf))

# [1.4.0](https://github.com/amclin/react-project-boilerplate/compare/v1.3.0...v1.4.0) (2019-10-02)


### Features

* **test:** display badges showing code coverage ([0c38bf2](https://github.com/amclin/react-project-boilerplate/commit/0c38bf2))

# [1.3.0](https://github.com/amclin/react-project-boilerplate/compare/v1.2.0...v1.3.0) (2019-10-02)


### Features

* **test:** display badges showing code coverage ([6b5fbc6](https://github.com/amclin/react-project-boilerplate/commit/6b5fbc6))

# [1.2.0](https://github.com/amclin/react-project-boilerplate/compare/v1.1.0...v1.2.0) (2019-10-02)


### Features

* **tests:** output code coverage as standard ([c94c0a9](https://github.com/amclin/react-project-boilerplate/commit/c94c0a9))
* **tests:** use jest for unit tests ([f8db8df](https://github.com/amclin/react-project-boilerplate/commit/f8db8df))

# [1.1.0](https://github.com/amclin/react-project-boilerplate/compare/v1.0.0...v1.1.0) (2019-09-30)


### Bug Fixes

* **lint:** ensure linting runs on correct files ([889ddfa](https://github.com/amclin/react-project-boilerplate/commit/889ddfa))


### Features

* **framework:** stub in minimal NextJS project ([77ef91c](https://github.com/amclin/react-project-boilerplate/commit/77ef91c))
