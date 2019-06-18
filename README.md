# Ethereum Lite Explorer by Alethio
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.
This means you can have your own private Ethereum Explorer should you wish so.
No need for servers, hosting or trusting any third parties to display chain data.

[![CircleCI](https://circleci.com/gh/Alethio/ethereum-lite-explorer.svg?style=svg)](https://circleci.com/gh/Alethio/ethereum-lite-explorer)
[![Docker](https://images.microbadger.com/badges/version/alethio/ethereum-lite-explorer.svg)](https://hub.docker.com/r/alethio/ethereum-lite-explorer "Get Ethereum Lite Explorer through Docker Hub")

> **WARNING v1.x.x is a breaking update from previous v0.x.x releases**

> NOTICE
> Please report any bugs using Github's [issues](https://github.com/Alethio/ethereum-lite-explorer/issues/)

## Contents
- [Technical Details](#technical-details)
    - [Project structure](#project-structure)
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Configuration](#configuration)
    - [Running in Docker](#running-in-docker)
    - [Setup/Build Instructions](#setupbuild-instructions)
    - [Example setups](#example-setups)
        - [With Infura](#with-infura)
        - [With Parity Light Client](#with-parity-light-client)
        - [With Ganache](#with-ganache)
        - [With Pantheon](#with-pantheon)
    - [Example Deployments](#example-deployments)
        - [surge.sh](#surgesh)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE.md)

## Technical Details

The project is built on a React/MobX and TypeScript stack, using the [Alethio CMS](https://github.com/Alethio/cms), which allows us to add extensions dynamically through 3rd party plugins.
The basic functionality of the explorer is implemented via a series of open-source [core plugins](https://github.com/Alethio/explorer-core-plugins), which we also use internally for our [aleth.io](https://aleth.io) platform. Please refer to [Alethio CMS](https://github.com/Alethio/cms) for documentation on the plugin system.

### Project structure
```
📁ethereum-lite-explorer
├─📁dev             - dev server for serving the app
├─📁dist            - target folder for application that contains deployables
└─📁src             - source files
  ├─📁app (*1)      - application source code
  ├─📁assets        - static assets (e.g. images) that will be bundled together with the application
  └─📁public        - contains static assets that are copied to the dist folder as they are

(*1)
📁app
├─📁components      - React components
├─📁translation     - localized strings
├─📁util            - application-agnostic utilities. Ideally these would be in a separate repo/package.
└─📄index.ts         - entry point
```

## Getting started

### Prerequisites
Please make sure you have the following installed and running properly
- [Node.js](https://nodejs.org/en/download/) >= 8.0 or [Docker](https://www.docker.com/)
- If building it you will also need NPM >= 6.9 (NPM is distributed with Node.js. For more information see: https://www.npmjs.com/get-npm)
- A JSON-RPC enabled and accessible Ethereum Client, some examples:
    * [An Infura Account](#with-infura)
    * [Parity Light Client](#with-parity-light-client)
    * [Ganache](#with-ganache)
    * [Pantheon Dev Mode](#with-pantheon) - private chain example
- If not using the pre-built Docker images, you will need an HTTP server for serving the app and it must be deployed at the root of the domain/subdomain.

### Configuration

The app stores its configurations in a JSON file called `config.json` and for development environment should be `config.dev.json`.
In this file are also defined the plugins that the app is using. The location of the config file must be in the root of the project. 

Here are 2 sample config files as starting point.  

| Config name | Description |
| --- | --- |
| config.default.json | Default configuration file which contains the core plugins of the app that are enough to run the explorer. |
| config.ibft2.json | Configuration file that has the default core plugins plus an extra one useful for [IBFT2 based chains](https://pegasys.tech/another-day-another-consensus-algorithm-why-ibft-2-0/) that decodes the extraData field of a block. |

The possibility to change the URL of the RPC enabled Ethereum node is done through the `eth-lite` core plugin. 
See the [`nodeUrl`](https://github.com/Alethio/ethereum-lite-explorer/blob/master/config.default.json#L16) attribute for the plugin which has de default value set to `https://mainnet.infura.io/`. 

For advanced configuration editing, please refer to the [Alethio CMS documentation](https://github.com/Alethio/cms)

### Running in Docker
You can run the Lite Explorer in Docker by using the already published images on [Docker Hub](https://hub.docker.com/r/alethio/ethereum-lite-explorer).
The config file in the Docker images have the default values from the `config.default.json` sample file. 
By default it will connect to `https://mainnet.infura.io/`.

The simplest command to run it is
```sh
$ docker run -p 80:80 alethio/ethereum-lite-explorer
```
which will start a container on port 80 of your computer with a nginx embedded to serve the pre-build explorer. You can now open [localhost](http://localhost) in your browser and use it. 

There are 2 env vars that can be passed in at runtime:

| ENV var | Description |
|---|---| 
| APP_NODE_URL | URL of RPC enabled node. (e.g. `https://user:pass@host:port`). This overrides in the config file the `nodeUrl` attribute of the `eth-lite` core plugin. |
| APP_BASE_URL | It is used ONLY in `index.html` for `og:tags`. Overrides build time defined value. |

For example if you want to connect to your node on localhost with all default configs run the following command:
```sh
$ docker run -p 80:80 -e APP_NODE_URL="http://localhost:8545" alethio/ethereum-lite-explorer
```
If more customization is needed, a full configuration file can be mounted in the application root (e.g. in the `/usr/share/nginx/html` folder).
```sh
$ docker run -p 80:80 -v /your-config-dir/config.json:/usr/share/nginx/html/config.json alethio/ethereum-lite-explorer
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

Copy the sample config file
```sh
$ cp config.default.json config.dev.json
```
Adjust `config.dev.json` to your needs. For development, you must also remove the version query strings `?v=#.#.#` from the `"plugins"` URIs. Full list of configuration options available [here](#configuration)

You can now build the explorer for production...
```sh
$ npm run build
```
... or development ...
```sh
$ npm run build-dev
```

... and install the default plugins:
```sh
$ npm i -g @alethio/cms-plugin-tool
$ acp install --dev \
    @alethio/explorer-plugin-eth-common \
    @alethio/explorer-plugin-eth-lite \
    @alethio/explorer-plugin-3box
```

For IBFT2-enabled networks, you also need to install the respective plugin:
```sh
$ acp install --dev @alethio/explorer-plugin-eth-ibft2
```

The plugins will be copied, together with the base app, in the `dist` folder.

**IMPORTANT**: Whenever you rebuild the base app, the plugins, which reside in the `dist` folder, will be deleted and you will have to reinstall them. To avoid this, use `npm run watch` instead of `npm run build-dev` for development. This does incremental builds and it will not clean the `dist` folder before each run.

Finally, you can run the explorer with
```sh
$ npm start
```

... or [deploy it](#example-deployments) somewhere.

### Example setups

#### With Infura
- [Sign-up](https://infura.io/register) for an account or [sign-in](https://infura.io/login) into your Infura account.

- From the control panel, obtain your endpoint url for the network you are interested in (mainnet, ropsten, kovan, rinkeby). It will looks similar to `https://mainnet.infura.io/v3/aa11bb22cc33.....`.

- Update `config.dev.json` file and set `nodeUrl` to your Infura endpoint.

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

After setting up and starting Ganache, update the `config.dev.json` file and set `nodeUrl` to `'http://localhost:7545'`.

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

After running Pantheon, update the `config.dev.json` file, and set `nodeUrl` to point to your running Pantheon URL:
```
"nodeUrl": "http://127.0.0.1:8545/"
```

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

### Example Deployments

#### surge.sh
Surge.sh is a simple, single-command web publishing service that you can use to deploy your own version of the Lite Explorer.

Make sure you have set a proper and accessible `APP_NODE_URL` environment variable.

```sh
# copy and edit a config file
$ cp config.default.json config.json
# install surge
$ npm install --global surge
# build explorer
$ npm run build
# go to build dir
$ cd dist
# make push state work as it should
$ cp ../config.json config.json && cp index.html 200.html
# deploy
$ surge
```
