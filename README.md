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
<!-- TOC depthFrom:2 depthTo:4 -->

- [Contents](#contents)
- [Technical Details](#technical-details)
    - [Project structure](#project-structure)
- [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Configuration](#configuration)
    - [Running in Docker](#running-in-docker)
    - [Running in Kubernetes](#running-in-kubernetes)
    - [Building from source](#building-from-source)
        - [Deploying the built assets to production](#deploying-the-built-assets-to-production)
        - [Custom build arguments](#custom-build-arguments)
    - [Example setups](#example-setups)
        - [With Memento](#with-memento)
        - [With Infura](#with-infura)
        - [With Parity Light Client](#with-parity-light-client)
        - [With Ganache](#with-ganache)
        - [With Besu](#with-besu)
    - [Example Deployments](#example-deployments)
        - [surge.sh](#surgesh)
- [How to](#how-to)
    - [Deploy to a domain sub-path](#deploy-to-a-domain-sub-path)
    - [Show the network name](#show-the-network-name)
    - [Link to a custom deployment of EthStats](#link-to-a-custom-deployment-of-ethstats)
    - [Use a custom ETH currency symbol](#use-a-custom-eth-currency-symbol)
    - [Show the transactions per account in account page](#show-the-transactions-per-account-in-account-page)
    - [Override specific text strings (translations)](#override-specific-text-strings-translations)
    - [Use a custom RPC node authentication method](#use-a-custom-rpc-node-authentication-method)

<!-- /TOC -->
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
    * [Besu Dev Mode](#with-besu) - private chain example
- If not using the pre-built Docker images, you will need an HTTP server for serving the app and it must be deployed at the root of the domain/subdomain.

### Configuration

The application requires a JSON configuration file which is loaded at runtime but with different approaches for `development` vs `production` environments.

For `development` the config file is called `config.dev.json` located in the root of the repository.
As for the `production` environment the config file is copied in the `dist` folder and renamed to `config.json`.

The `dist` is the target folder for the built application that needs to be served by an HTTP server.

Here are 3 sample config files as starting point.

| Config name | Description |
| --- | --- |
| config.default.json | Default configuration file which contains the core plugins of the app that are enough to run the explorer. |
| config.ibft2.json | Configuration file that has the default core plugins plus an extra one useful for [IBFT2 based chains](https://pegasys.tech/another-day-another-consensus-algorithm-why-ibft-2-0/) that decodes the extraData field of a block. |
| config.memento.json | Configuration file that has the default core plugins plus the memento plugins to use the Memento API as a data source |

The possibility to change the URL of the RPC enabled Ethereum node is done through the `eth-lite` core plugin.
See the [`nodeUrl`](https://github.com/Alethio/ethereum-lite-explorer/blob/master/config.default.json#L16) attribute for the plugin which has the default value set to `https://mainnet.infura.io/`.

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
| APP_NODE_URL | URL of RPC enabled node. (e.g. `https://host:port`, also supports Basic Auth by prepending `user:pass@` to the `host`). This overrides in the config file the `nodeUrl` attribute of the `eth-lite` core plugin. |
| APP_BASE_URL | It is used ONLY in `index.html` for `og:tags` (e.g. `https://my.app.tld`). Overrides build time defined value. |

For example if you want to connect to your node on localhost with all default configs run the following command:
```sh
$ docker run -p 80:80 -e APP_NODE_URL="http://localhost:8545" alethio/ethereum-lite-explorer
```
If more customization is needed, a full configuration file can be mounted in the application root (e.g. in the `/usr/share/nginx/html` folder).
```sh
$ docker run -p 80:80 -v /your-config-dir/config.json:/usr/share/nginx/html/config.json alethio/ethereum-lite-explorer
```
### Running in Kubernetes
You can deploy the Lite Explorer in Kubernetes using the following steps:
- `cd .kubernetes`
- Run `./deploy.sh` to deploy, uses `config.default.json` as config.
- Use for example `./deploy.sh ../config.memento.json` to select other config files.
- Run `./remove.sh` to remove


### Building from source
Clone the explorer in a folder of your choosing
```sh
$ git clone https://github.com/Alethio/ethereum-lite-explorer.git
$ cd ethereum-lite-explorer
```

**IMPORTANT**: Make sure you are using npm 6.9+ for the next step. Older versions will NOT work due to `alias` feature usages introduced in npm 6.9.

Install npm packages
```sh
$ npm install
```

Copy the sample config file
```sh
$ cp config.default.json config.dev.json
```
Make necessary modifications into `config.dev.json` if needed. For development, you must also remove the version query strings `?v=#.#.#` from the `"plugins"` URIs. Full list of configuration options available [here](#configuration)

To start the development build run the following command:
```sh
$ npm run watch
```

This terminal will be kept open, as the above command continuously watches the source files for changes and triggers an incremental build on every change.

Alternatively, to build the minified version (used also for `production`) use:
```sh
$ npm run build
```

Since the app is using the Alethio CMS for using the core plugins the next step is to install them:
```sh
$ npm i -g @alethio/cms-plugin-tool
$ acp install --dev \
    @alethio/explorer-plugin-eth-common \
    @alethio/explorer-plugin-eth-lite \
    @alethio/explorer-plugin-eth-memento \
    @alethio/explorer-plugin-3box
```

If you need other custom plugins like for example to decode the extraData field of a block for the IBFT2 based networks, you can install them at this step:
```sh
$ acp install --dev @alethio/explorer-plugin-eth-ibft2
```

The above command `acp` installs the plugins in the `dist` folder. Basically they will be copied, together with the base app.

**IMPORTANT**: Whenever you use `npm run build` or `npm run build-dev` the `dist` folder is emptied, thus the plugins are also deleted and they need to be reinstalled.

Finally, you can start the local Explorer development server with
```sh
$ npm start
```

#### Deploying the built assets to production

When building from source, you are responsible for setting up your own production environment. There are two available options: you can either start from our existing Dockerfile found in the root of the repo and customize that, or you can use your own custom solution.

For a custom deployment, first make sure you have built the Explorer distributables for production, using `npm run build`. Assuming you already have a web server, such as Nginx, you will need to copy everything from the `dist/` folder to the public folder of the web server (e.g. /usr/share/nginx/html). Then, in the same target folder you need a valid `config.json` file. Note the filename, which is different from the development version. You can use the `config.*.json` from the root of the repo as templates. Make sure to also fill in the `nodeUrl` in the `eth-lite` plugin config section. Lastly, make sure that your web server redirects all routes to the `index.html` to enable HTML5 routing. You can refer to `.docker/nginx.conf` as an example.

#### Custom build arguments

The following env vars can be passed when building from source:

| ENV var | Description |
|---|---|
| APP_BASE_URL | It is used ONLY in `index.html` for `og:tags` (e.g. `https://my.app.tld`) |
| APP_BASE_PATH | Enables serving the app on a sub-path instead of the domain root (e.g. `some/path/to/app`). |

Example:
If serving the app from `https://my.tld/path/to/app`:
` $ APP_BASE_URL="https://my.tld" APP_BASE_PATH="path/to/app" npm run build`

### Example setups

#### With Memento
[Memento](https://github.com/Alethio/memento) is Alethio's open source tool for scraping and indexing Ethereum data from any web3-compatible node.
The biggest advantage of using Memento as a data source is the indexed data which allows a faster access as well as the ability to show transactions on the account page.

If you don't have a Memento environment set up already, follow the instructions [here](https://github.com/Alethio/memento#installation)

> This requires Memento >= v1.1.0

**Easiest way to run with Memento** is to follow the steps from [Running in Docker](#running-in-docker) and mount `config.memento.js` as config file.

**If you want a more customized setup**, follow [Building from source](#building-from-source) and the following steps

Build the Lite Explorer
```sh
$ npm run build
```

Install the necessary plugins
```sh
$ acp install --dev \
    @alethio/explorer-plugin-eth-common \
    @alethio/explorer-plugin-eth-memento \
    @alethio/explorer-plugin-3box
```

Copy the config file
```sh
$ cp config.memento.json config.dev.json
```

Modify the `apiBasePath` to point to Memento's API and, since we are running in dev mode, remove the version query strings `?v=#.#.#` from the "plugins". The "plugins" section should look as follows:
```sh
"plugins": [{
    "uri": "plugin://aleth.io/eth-common"
}, {
    "uri": "plugin://aleth.io/3box",
    "config": {
        "ipfsUrlMask": "https://ipfs.infura.io/ipfs/%s"
    }
}, {
    "uri": "plugin://aleth.io/eth-memento",
    "config": {
        "apiBasePath": "http://localhost:3001/api/explorer"
    }
}],
```

Start the explorer
```sh
$ npm start
```

#### With Infura
- [Sign-up](https://infura.io/register) for an account or [sign-in](https://infura.io/login) into your Infura account.

- From the control panel, obtain your endpoint url for the network you are interested in (mainnet, ropsten, kovan, rinkeby). It will looks similar to `https://mainnet.infura.io/v3/aa11bb22cc33.....`.

- Update `config.dev.json` file and set the `nodeUrl` attribute for the `eth-lite` plugin to your Infura endpoint.

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

Update `config.dev.json` file and set the `nodeUrl` attribute for the `eth-lite` plugin to `http://127.0.0.1:8545`.

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

#### With Ganache
First of all, if you do not have it, download and install [Ganache](https://truffleframework.com/ganache) which will give you your own personal test chain.

After setting up and starting Ganache, update the `config.dev.json` file and set the `nodeUrl` attribute for the `eth-lite` plugin to `http://127.0.0.1:7545`.

Build and start Lite Explorer
```sh
$ npm run build && npm start
```

#### With Besu
This is a great way to use a full featured client, and to see how the explorer works with a private network.

Refer to [Besu Light Explorer HowTo](https://besu.hyperledger.org/en/stable/HowTo/Deploy/Lite-Block-Explorer/ ) to configure your node and explorer.

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

## How to

### Deploy to a domain sub-path

This case is supported only when building from source. You will have to pass the `APP_BASE_PATH` env variable to the build command. See [Custom build arguments](#custom-build-arguments) for reference and examples.

### Show the network name

You can use our predefined module that shows the current network and an optional switch for navigating to other deployments/networks. To use this module, just add the following in `config.json`:

```jsonc
{
    // ...
    "pages": [
        // ...
        {
            "def": "page://aleth.io/dashboard",
            "children": {
                "content": [
                    {
                        "def": "module://aleth.io/dashboard/network",
                        "options": {
                            "networkName": "MyTestNet",
                            // This is optional
                            "otherNetworks": [
                                { "name": "Ethereum MainNet", "url": "https://aleth.io" }
                            ]
                        }
                    },
                    // ...
                ]
            }
        }
    ]
}
```

### Link to a custom deployment of EthStats

If you have a custom deployment of our [EthStats](https://github.com/Alethio/ethstats-network-dashboard) product, you can easily link to it from the main app toolbar using the predefined module. You'll have to edit `config.json` as shown below:

```jsonc
{
    "plugins": [{
        "uri": "plugin://aleth.io/eth-common?v#.#.#",
        "config": {
            // ...
            "ethstatsUrl": "https://ethstats.io"
        }
    }],
    // ...
    "rootModules": {
        "toolbarTop": [
            // ...
            { "def": "module://aleth.io/toolbar/ethstats" }
        ],
        // ...
    }
}
```

### Use a custom ETH currency symbol

If you are deploying for a private or test net, you can customize the main currency symbol by editing the config:


```jsonc
{
    "plugins": [{
        "uri": "plugin://aleth.io/eth-lite?v#.#.#",
        "config": {
            // ...
            "ethSymbol": "GöETH"
        }
    }]
}
```
### Show the transactions per account in account page

This module requires `@alethio/explorer-plugin-eth-memento` and access to call the api of a memento lite pipeline deployment.
Edit the config:

```jsonc
{
    "plugins": [{
        "uri": "plugin://aleth.io/eth-memento?v#.#.#",
        "config": {
            "ethSymbol": "GoETH",
            "apiBasePath": "http://memento-api.example/api/explorer"
        }
    }]
}
```

And add the module to account page:

```jsonc
{
    "pages": [{
        "def": "page://aleth.io/account",
        "children": {
            // ...
            "bottom": [
                { "def": "module://aleth.io/memento/account/txs" }
                // ...
            ]
        }
    }]
}
```

If you want to use Memento as a full backend replacement (recommended), see the [With Memento](#with-memento) section.

### Override specific text strings (translations)

You can customize texts for each plugin by overriding the corresponding translation keys in the plugin's configuration:

```jsonc
{
    "plugins": [{
        "uri": "plugin://aleth.io/eth-lite?v#.#.#",
        "config": {
            //...
        },
        "translations": {
            "en-US": {
                "dashboardView.title": "My Private Network Explorer"
            }
        }
    }]
}
```

You can refer to individual translation keys in the core plugins repo. Follow [this link](https://github.com/Alethio/explorer-core-plugins/tree/master/src/app/eth-lite/translation) for the eth-lite plugin translations and [this one](https://github.com/Alethio/explorer-core-plugins/tree/master/src/app/eth-common/translation) for eth-common plugin translations.

### Use a custom RPC node authentication method

If your RPC node requires a custom authentication step (e.g. Besu), the `eth-lite` plugin supports initialization hooks for the purpose of injecting authorization headers into the web3 instance. You will need to create a plugin that handles the authentication steps (e.g. collects credentials via a login form or 3rd party page redirect). The plugin will export a data adapter returning an object that follows the [IAuthStore](https://github.com/Alethio/explorer-core-plugins/blob/master/src/app/eth-lite/IAuthStore.ts) interface definition. The public URI for that adapter is passed to the `eth-lite` plugin config via the [authStoreUri](https://github.com/Alethio/explorer-core-plugins/blob/master/src/app/eth-lite/EthLitePluginConfig.ts#L14) key. This will pause the initialization of the `eth-lite` plugin until the authentication is handled.

Check out this Besu plugin as an example: https://www.npmjs.com/package/@adetante/explorer-besu-plugin
