# Ethereum Lite Explorer by Alethio
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.
This means you can have your own private Ethereum Explorer should you wish so.
No need for servers, hosting or trusting any third parties to display chain data.

[![CircleCI](https://circleci.com/gh/Alethio/ethereum-lite-explorer.svg?style=svg)](https://circleci.com/gh/Alethio/ethereum-lite-explorer)

> **WARNING v1.x.x is a breaking update from previous v0.x.x releases**

> NOTICE
> This is a big piece of work in progress.
> Please report any bugs using Github's [issues](https://github.com/Alethio/ethereum-lite-explorer/issues/)

## Contents
- [Short Term Roadmap](#short-term-roadmap)
- [Technical Details](#technical-details)
    - [Project structure](#project-structure)
    - [Managing SVG icons](#managing-svg-icons)
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Configuration](#configuration)
    - [Running in Docker](#running-in-docker)
    - [Setup/Build Instructions](#setupbuild-instructions)
    - [Running tests](#running-tests)
    - [Example setups](#example-setups)
        - [With Infura](#with-infura)
        - [With Parity Light Client](#with-parity-light-client)
        - [With Ganache](#with-ganache)
        - [With Pantheon](#with-pantheon)
    - [Example Deployments](#example-deployments)
        - [surge.sh](#surgesh)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE.md)


## Short Term Roadmap
- Post 1.0
    * [ ] Plugins System

## Technical Details

The project is built using React, TypeScript and the [Ethstats UI Components](https://github.com/Alethio/ethstats-ui).

### Project structure
```
📁block-explorer
├─📁dev             - dev server for serving the app and mocking block-explorer-api responses
├─📁dist            - target folder for application that contains deployables
└─📁src             - source files
  ├─📁app (*1)      - application source code
  ├─📁assets        - static assets (e.g. images) that will be bundled together with the application
  └─📁public        - contains static assets that are copied to the dist folder as they are

(*1)
📁app
├─📁components      - application-level components to be reused across all pages (render layer)
├─📁data            - data layer (data structures, parsing server responses, caching, transformations, state mgmt)
├─📁helpers         - application-specific helpers/utils that couldn't be categorized differently 😄
├─📁page            - components for each page/view of the application
│ └─📁<pageName>
├─📁translation     - localized strings
├─📁util            - application-agnostic utilities. Ideally these would be in a separate repo/package.
└─📄index.ts         - entry point
```

### Managing SVG icons

Original SVG sources should be kept in the `src/assets/original-svg` folder. To create SVG icon components from them, the following steps should be taken:

1. Copy the SVG markup in the render method of a new React component
2. Replace all dash (-) attributes with camelCase
3. Remove any unneeded attributes or run the SVG through an optimizer tool
4. The viewBox of the icon should be a square. If needed use `<g transform="translate(x,y)">` to center the icon in the new viewBox. This allows proper sizing via `size` prop
5. Replace the main fill/stroke color with `currentColor`, to ensure proper cascading, or parametrize if more than one color
6. The resulting component should be configured with a size prop that applies to both width and height

## Getting started

> Known Issues
> Currently nodes behind HTTP basic auth do not work.

### Prerequisites
Please make sure you have the following installed and running properly
- [Node.js](https://nodejs.org/en/download/) >= 8.0 or [Docker](https://www.docker.com/)
- If building it you will also need NPM >= 5.0 (NPM is distributed with Node.js. For more information see: https://www.npmjs.com/get-npm)
- A JSON-RPC enabled and accessible Ethereum Client, some examples:
    * [An Infura Account](#with-infura)
    * [Parity Light Client](#with-parity-light-client)
    * [Ganache](#with-ganache)
    * [Pantheon Dev Mode](#with-pantheon) - private chain example

### Configuration
You can set any of the following variables either in config.dev.json, config.json or as environment variables for the Docker image to change the behavior of the explorer.


| ENV var | Description |
| --- | --- |
| APP_NODE_URL | URL of RPC enabled node. |
| APP_NODE_URL_USER | If your RPC node is behind HTTP Basic Authentification then use this to set the username. |
| APP_NODE_URL_PASS | HTTP Basic Authentification Password. |
| APP_INFURA_PROJECT_ID | Infura Project ID. You can get this from your [Infura Dashboard](https://infura.io/dashboard). Adding this will enable a dropdown to select from the available Infura endpoints. |
| APP_ROUTER_HISTORY_MODE | When `false` (default mode) the explorer uses the URL hash for routing. Works with all browsers/servers, including those that do not support HTML5 History API. `true` requires HTML5 History API and server config to redirect all requests that do not have a file to index.html so they are picked by the react router. |
| APP_NETWORK_MONITOR_URL | Setting this variable to an URL will add a menu item in the sidebar with a link to the set url |

> NOTICE: if `APP_NODE_URL` and `APP_INFURA_PROJECT_ID` are both missing, the explorer will start with the Infura endpoints in anonymous mode (https://mainnet.infura.io/, https://kovan.infura.io/, ...).

### Running in Docker
You can run the Lite Explorer in Docker without having to get the source code and build it.
The simplest command to run i is

```sh
$ docker run -p 80:80 alethio/ethereum-lite-explorer
```
which will start a container on port 80 of your computer with a nginx embedded to serve the pre-build explorer. You can then open [localhost](http://localhost) in your browser to use it.

To configure the container at runtime please see [configuration](#configuration)


So for example if you want to start the explorer with both infura and a custom node url, and have the container auto delete itself after you close it, you would run something like
```sh
docker \
    run --rm \
    -p 80:80 \
    -e APP_INFURA_PROJECT_ID=your-infura-proj-id \
    -e APP_NODE_URL=https://kovan.infura.io \
    alethio/ethereum-lite-explorer
```

### Setup/Build Instructions
Clone the explorer in a folder of your choosing
```sh
$ git clone https://github.com/Alethio/ethereum-lite-explorer.git
$ cd ethereum-lite-explorer
```
Install npm packages
```sh
$ npm install
```
Copy the sample config variables
```sh
$ cp config.default.json config.dev.json
```
Adjust `config.dev.json` to your needs. You can remove the variables you do not wish to change from default. Full list of options available [here](#configuration)

After which you can build the explorer for production
```sh
$ npm run build
```
or development
```sh
$ npm run build-dev
```

the `dist` folder will then contain the minimised and optimised version fo the app. Got ahead and [deploy it](#example-deployments) somewhere.

Finally you can run the explorer with
```sh
$ npm start
```

### Running tests

`npm test` (or `npm run test-coverage` to generate code coverage as well).

Test coverage is written to `./coverage` in HTML and LCOV formats.

Configuration for the VSCode LCOV extension is already included in the project.

### Example setups

#### With Infura
[Sign-up](https://infura.io/register) for an account or [sign-in](https://infura.io/login) into your Infura account.

After that you have two options:

- connect to a single network
  From the control panel, obtain your endpoint url for the network you are interested in (mainnet, ropsten, kovan, rinkeby).
  It will looks similar to `https://mainnet.infura.io/v3/aa11bb22cc33.....`.

  Update `.env.local` file and set `APP_NODE_URL` to your Infura endpoint.

- have a choice of infura networks and be able to switch between them
  From the control panel obtain your Infura Project ID

  Update `.env.local` file and set `APP_INFURA_PROJECT_ID` to your project id to get a dropdown of all the available Infura networks.

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

####  With Parity Light Client
This will allow you to run both your own node and explorer.
No third-party dependencies.
It will be slower to browse older data because it is fetching it real time from other ethereum peer nodes but it's fast to sync and low in resource usage.

[Install Parity Ethereum](https://wiki.parity.io/Setup) through one of the convenient methods and start it with the `--light` cli flag.

As a simple step, if you have Docker, you could just run

```sh
$ docker run -d --restart always --name parity-light -p 127.0.0.1:8545:8545 parity/parity:stable --light --jsonrpc-interface all
```

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

#### With Ganache
First of all, if you do not have it, download and install [Ganache](https://truffleframework.com/ganache) which will give you your own personal test chain.

After setting up and starting Ganache, update the `.env.local` file and set `APP_NODE_URL` to `'http://localhost:7545'`.

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

#### With Pantheon
This is a great way to use a full featured client, and to see how the explorer works with a private network.

First of all, if you do not have it, [download and install Pantheon stable release](https://docs.pantheon.pegasys.tech/en/stable/Installation/Install-Binaries/).

To get started, run a Pantheon node in development mode, with the HTTP and WebSockets JSON-RPC services enabled, mining enabled, allowing traffic from all hosts and CORS origins :

```sh
$ pantheon --dev-mode --rpc-enabled --ws-enabled --miner-enabled --miner-coinbase=fe3b557e8fb62b89f4916b721be55ceb828dbd73 --host-whitelist=* --rpc-cors-origins=*

```

_(Note: using "*" values for host whitelist and CORS origins is not a recommended way to run a production node securely, this configuration is intended for test or developement purpose only. For more information about these options, refer to the [Pantheon CLI reference](https://docs.pantheon.pegasys.tech/en/stable/Reference/Pantheon-CLI-Syntax/))._

After running Pantheon, update the `config.dev.json` file, and set `APP_NODE_URL` to point to your running Pantheon URL:
```
APP_NODE_URL='http://127.0.0.1:8545/'
```

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

### Example Deployments

#### surge.sh
Surge.sh is a simple, single-command web publishing service that you can use to deploy your own version of the Lite Explorer.

Make sure you have set a proper and accessible `APP_NODE_URL`

```sh
# copy and edit a config file
$ cp config.default.json config.deploy.json
# install surge
$ npm install --global surge
# build explorer
$ npm run build
# go to build dir
$ cd dist
# make push state work as it should
$ cp ../config.deploy.json && cp index.html 200.html && cp index.html 404.html
# deploy
$ surge
```
