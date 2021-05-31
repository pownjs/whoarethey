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
pown-cli whoarethey <accounts...>

find social networking accounts and more

Options:
  --version                                                 Show version number  [boolean]
  --help                                                    Show help  [boolean]
  --request-concurrency, -c                                 The number of requests to send at the same time  [number] [default: Infinity]
  --method, -X                                              Custom method  [string]
  --header, -H                                              Custom header  [string]
  --connect-timeout, -t, --timeout                          Maximum time allowed for the connection to start  [number] [default: 30000]
  --data-timeout, -T                                        Maximum time allowed for the data to arrive  [number] [default: 30000]
  --accept-unauthorized, -k, --insecure                     Accept unauthorized TLS errors  [boolean] [default: false]
  --filter-response-code, --response-code, --filter-status  Filter responses with code  [string] [default: ""]
  --content-sniff-size, --content-sniff, --sniff-size       Specify the size of the content sniff  [number] [default: 5]
  --print-response-body, --print-body                       Print response body  [boolean] [default: false]
  --download-response-body, --download-body                 Download response body  [boolean] [default: false]
  --proxy-url, --proxy                                      Setup proxy  [string] [default: ""]
  --task-concurrency, -C                                    Number of concurrent requests  [number] [default: Infinity]
  --categories, -s                                          Only use selected categories  [string] [default: ""]
  --output-format                                           Output format for results  [string] [choices: "table", "json", "url"] [default: "table"]
```

## Example

The following example show how to enumerate various accounts belonging to 1password password manager:

```
pown whoarethey 1password
```

![screenshot](https://media.githubusercontent.com/media/pownjs/pown-whoarethey/master/screenshots/01.png)
