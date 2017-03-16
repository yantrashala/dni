# dni

[![Build status](https://travis-ci.org/yantrashala/dni.svg)](https://travis-ci.org/yantrashala/dni) [![Dep Badge](https://david-dm.org/yantrashala/dni.svg)](https://david-dm.org/yantrashala/dni.svg) [![GitHub issues](https://img.shields.io/github/issues/yantrashala/dni.svg)](https://github.com/yantrashala/dni/issues)


Node utility to **_download and install (dni)_** a deployable module and install its dependencies.

### Table of contents
* Installation
* Features
* Usage
* Example

#### Installation

```sh
npm install dni -g
```

#### Features

- Downloads a zipped(.tgz) deployable package.
- Unzips the downloaded package.
- Installs the dependencies from its package.json.

#### Usage

```
$ dni <module_name>
```

#### Example
```
$ dni npm-install-all
```
