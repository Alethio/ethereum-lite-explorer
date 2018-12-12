# Ethstats Lite Explorer
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.  
This means you can have your own private Ethereum Explorer should you wish so. 
No need for servers, hosting or trusting any third parties to display chain data.

[![CircleCI](https://circleci.com/gh/Alethio/ethstats-lite-explorer.svg?style=svg)](https://circleci.com/gh/Alethio/ethstats-lite-explorer)

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
    * [ ] Docs and Examples
    * [ ] Allow Custom Node URLs
    * [ ] Infura Nodes Dropdown selector (if not custom)
    * [ ] Re-add Docker build 
- Milstone 1.0 - React-ified 
    * [ ] Release [Ethstats](ethstats.io) React primitive components
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
```
$ git clone https://github.com/Alethio/ethstats-lite-explorer.git
$ cd ethstats-lite-explorer
```
Install npm packages
```
$ npm install
```
Copy the sample environment variables
```
$ cp .env.example .env.local
```
Adjust `.env.local` to your needs. You can remove the variables you do not wish to change from default.

| ENV var | Description |
| --- | --- |
| VUE_APP_CONNECTION_TYPE | RPC Connection type. `'json_rpc'` for http(s)  or `'ws'` for websockets. Default `'json_rpc'`. |
| VUE_APP_NODE_URL | URL of RPC enabled node. Default `'https://mainnet.infura.io/'` |
| VUE_APP_BASE_URL | Path of your app. Use `'/'` for root directory, `'subfolder-path'` if your app live in another folder or `''` if you want to open the app directly from the file system without any server. Default `'/'`. |
| VUE_APP_NODE_USER | If your RPC node is behind HTTP Basic Authentification then use this to set the username. |
| VUE_APP_NODE_PASSWORD | HTTP Basic Authentification Password. |

After which you can run the explorer (in development mode)
```
$ npm run serve
```

or build it for deployment
```
$ npm run build
```
the `dist` folder will then contain the minimised and optimised version fo the app. Got ahead and [deploy it](#example-deployments) somewhere.

### Example setups

#### With Infura

####  With Parity Light Client

#### With Ganache

### Example Deployments

#### surge.sh