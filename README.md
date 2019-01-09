# EthStats Lite Explorer
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.  
This means you can have your own private Ethereum Explorer should you wish so. 
No need for servers, hosting or trusting any third parties to display chain data.

[![CircleCI](https://circleci.com/gh/Alethio/ethstats-lite-explorer.svg?style=svg)](https://circleci.com/gh/Alethio/ethstats-lite-explorer)

> NOTICE   
> This is a big piece of work in progress.  
> Please report any bugs using Github's [issues](https://github.com/Alethio/ethstats-lite-explorer/issues/)

## Contents
- [Short Term Roadmap](#short-term-roadmap)
    * [Technical Details](#technical-details)
        + [Structure](#structure)
        + [Data](#data)
- [Getting started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Setup/Build Instructions](#setup-build-instructions)
    * [Example setups](#example-setups)
        + [With Infura](#with-infura)
        + [With Parity Light Client](#with-parity-light-client)
        + [With Ganache](#with-ganache)
    * [Example Deployments](#example-deployments)
        + [surge.sh](#surgesh)
- [Contributing](CONTRIBUTING.md)
- [License](LICENSE.md)

## Short Term Roadmap 
- Milstone 0.5 - Initial release
    * [x] Docs and Examples
    * [x] Allow Custom Node URLs
    * [x] Infura Nodes Dropdown selector
    * [ ] Re-add Docker build 
- Milstone 1.0 - React-ified 
    * [ ] Release [EthStats](ethstats.io) React primitive components
    * [ ] Migrate app to React

### Technical Details

#### Structure

The project is built using [Vue.js](https://vuejs.org/) and [BulmaCSS](https://bulma.io/).

`main.js` defines the library functions. You will mainly need `lib_goToBlock`, `lib_goToAccount`, `lib_UID`, `lib_getTransaction`, `lib_getBlock`. those functions are available to all Vue components instantiated in the project.

`router.js` defines the routes of the webapp, mainly `/block`, `/account`, `/tx`.

#### Data

The data that are available through the project are:

- block: Same as web3js definition of a block (Cached)
- transaction: Same as web3js definition of a transaction with embedded receipt. (Cached)
- account: has the fields balance, bytecode and type. (Not cached)

## Getting started

### Prerequisites 
Please make sure you have the following installed and running properly
- [Node.js](https://nodejs.org/en/download/) >= 8.0  
- NPM >= 5.0 (NPM is distributed with Node.js. For more infos see: https://www.npmjs.com/get-npm)
- a JSON-RPC enabled and accessible Ethereum Client, some examples:
    * [An Infura Account](#with-infura)
    * [Parity Light Client](#with-parity-light)
    * [Ganache](#with-ganache)

### Setup/Build Instructions
Clone the explorer in a folder of your choosing
```sh
$ git clone https://github.com/Alethio/ethstats-lite-explorer.git
$ cd ethstats-lite-explorer
```
Install npm packages
```sh
$ npm install
```
Copy the sample environment variables
```sh
$ cp .env.example .env.local
```
Adjust `.env.local` to your needs. You can remove the variables you do not wish to change from default.

| ENV var | Description |
| --- | --- |
| VUE_APP_CONNECTION_TYPE | RPC Connection type. `'json_rpc'` for http(s)  or `'ws'` for websockets. Default `'json_rpc'`. |
| VUE_APP_NODE_URL | URL of RPC enabled node. Default `'https://mainnet.infura.io/'` |
| VUE_APP_INFURA_PROJECT_ID | Infura Project ID. You can get this from your [Infura Dashboard](https://infura.io/dashboard). Adding this will enable a dropdown to select from the available Infura endpoints.
| VUE_APP_BASE_URL | Path of your app. Use `'/'` for root directory, `'subfolder-path'` if your app live in another folder or `''` if you want to open the app directly from the file system without any server. Default `'/'`. |
| VUE_APP_NODE_USER | If your RPC node is behind HTTP Basic Authentification then use this to set the username. |
| VUE_APP_NODE_PASSWORD | HTTP Basic Authentification Password. |
| VUE_APP_ROUTER_MODE | Vue Router mode `'hash'` (default mode) uses the URL hash for routing. Works in all Vue-supported browsers, including those that do not support HTML5 History API. `'history'` requires HTML5 History API and server config. See [HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html).

> NOTICE: if `VUE_APP_NODE_URL` and `VUE_APP_INFURA_PROJECT_ID` are both missing, the explorer will start with the Infura mainnet endpoint in anonymous mode (https://mainnet.infura.io/).

After which you can run the explorer (in development mode)
```sh
$ npm run serve
```

or build it for deployment
```sh
$ npm run build
```
the `dist` folder will then contain the minimised and optimised version fo the app. Got ahead and [deploy it](#example-deployments) somewhere.

### Example setups

#### With Infura
[Sign-up](https://infura.io/register) for an account or [sign-in](https://infura.io/login) into your Infura account.  

After that you have two options:

- connect to a single network  
  From the control panel, obtain your endpoint url for the network you are interested in (mainnet, ropsten, kovan, rinkeby). 
  It will looks similar to `https://mainnet.infura.io/v3/aa11bb22cc33.....`.  

  Update `.env.local` file and set `VUE_APP_NODE_URL` to your Infura endpoint.

- have a choice of infura networks and be able to swith between them  
  From the control panel obtain your Infura Project ID
  
  Update `.env.local` file and set `VUE_APP_INFURA_PROJECT_ID` to your project id to get a dropdown of all the available Infura networks.

Start Lite explorer 
```sh
$ npm run serve
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

Start Lite explorer 
```sh
$ npm run serve
```

#### With Ganache
First of all, if you do not have it, download and install [Ganache](https://truffleframework.com/ganache) which will give you wour own personal test chain.

After setting up and starting Ganache, update the `.env.local` file and set `VUE_APP_NODE_URL` to `'http://localhost:7545'`.

Start Lite explorer 
```sh
$ npm run serve
```

### Example Deployments

#### surge.sh
Surge.sh is a simple, single-command web publishing service that you can use to deploy your own version of the Lite Explorer.

Make sure you have set a proper and accessible `VUE_APP_NODE_URL`

```sh
$ npm install --global surge
# build explorer
$ npm run build
# go to build dir
$ cd dist
# make push state work as it should
$ cp index.html 200.html && cp index.html 404.html
# deploy
$ surge
```
