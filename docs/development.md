# Development

The library uses Node.js, TypeScript and Webpack for development, Jest to run unit tests, TSLint for linting the source code and Prettier for the code style.

## Table of Contents

* [Requirements](#requirements)
* [Getting Started](#getting-started)
  * [Running Unit Tests](#running-unit-tests)
  * [Linting](#linting)
* [Code Style](#code-style)

## Requirements

* A modern Node.js version
* `yarn`

## Getting Started

1. Clone the repository.

  ```bash
  $ git clone git@github.com:Mrtenz/soundfont2.git
  ```
  
2. Install the dependencies.

  ```bash
  $ yarn
  ```

3. Build the files.

  ```bash
  $ yarn run build
  ```

### Running Unit Tests

The library uses Jest for unit tests. This is done automatically before committing, to prevent any bugs, but you can also run Jest manually.

```bash
$ yarn run test
```

### Linting

Files are linted with TSLint. This is done automatically before committing, to ensure a consistent code base, but you can also run TSLint manually.

```bash
$ yarn run tslint
```

## Code Style

The library uses Prettier to ensure a consistent code style. The Prettier settings can be found in [this file](https://github.com/Mrtenz/soundfont2/blob/master/.prettierrc). It is automatically run before committing, but you can also run Prettier manually.

```bash
$ yarn run prettier:diff
```
