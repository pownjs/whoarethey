[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/whoarethey.svg)](https://www.npmjs.com/package/@pown/whoarethey)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://github.com/pownjs/lobby)
![default workflow](https://github.com/pownjs/nucleoid/actions/workflows/default.yaml/badge.svg)
[![SecApps](https://img.shields.io/badge/credits-SecApps-black.svg)](https://secapps.com)

# Pown WhoAreThey

Quickly identify social networking accounts and more.

## Credits

This tool is part of [secapps.com](https://secapps.com) open-source initiative.

```
  ___ ___ ___   _   ___ ___  ___
 / __| __/ __| /_\ | _ \ _ \/ __|
 \__ \ _| (__ / _ \|  _/  _/\__ \
 |___/___\___/_/ \_\_| |_|  |___/
  https://secapps.com
```

## Quickstart

This tool is meant to be used as part of [Pown.js](https://github.com/pownjs/pown) but it can be invoked separately as an independent tool.

Install Pown first as usual:

```sh
$ npm install -g pown@latest
```

Invoke directly from Pown:

```sh
$ pown whoarethey
```

Otherwise, install this module locally from the root of your project:

```sh
$ npm install @pown/whoarethey --save
```

Once done, invoke pown cli:

```sh
$ POWN_ROOT=. ./node_modules/.bin/pown-cli whoarethey
```

You can also use the global pown to invoke the tool locally:

```sh
$ POWN_ROOT=. pown whoarethey
```

## Usage

```
{{usage}}
```

## Example

The following example show how to enumerate various accounts belonging to 1password password manager:

```
pown whoarethey 1password
```

![screenshot](https://media.githubusercontent.com/media/pownjs/pown-whoarethey/master/screenshots/01.png)
