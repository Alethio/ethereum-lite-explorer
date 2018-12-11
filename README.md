
# Ethstats Lite Explorer
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.  
This means you can have your own private Ethereum Explorer should you wish so. 
No need for servers, hosting or trusting any third parties to display chain data.

## Short Term Roadmap 
- Milstone 0.5 - Initial release
  - [ ] Docs and Examples
  - [ ] Allow Custom Node URLs
  - [ ] Infura Node Dropdown selector (if not custom)
  - [ ] Add Docker build 
- Milstone 1.0 - Reactified 
  - [ ] Release [Ethstats](ethstats.io) React primitive components
  - [ ] Migrate app to React

### Technical Details

#### Structure

The project is built using [Vue.js](https://vuejs.org/) and [BulmaCSS](https://bulma.io/).

`main.js` defines the library functions. You will mainly need `lib_goToBlock`, `lib_goToAccount`, `lib_UID`, `lib_getTransaction`, `lib_getBlock`. those functions are available to all Vue components instantiated in the project.

`router.js` defines the routes of the webapp, mainly `/block`, `/account`, `/tx`.

#### Data

The data that are available through the project are:

* block: Same as web3js definition of a block (Cached)
* transaction: Same as web3js definition of a transaction with embedded receipt. (Cached)
* account: has the fields balance, bytecode and type. (Not cached)

#### Env variables
```
VUE_APP_CONNECTION_TYPE='json_rpc'
VUE_APP_NODE_URL='https://mainnet.infura.io/'
VUE_APP_BASE_URL='/'
VUE_APP_NODE_USER='username'
VUE_APP_NODE_PASSWORD='abcd'
```

## Getting started


```
npm install

```







## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



# Docker 
1. go to project dir and run:
```
docker build --build-arg NODE_URL=https://ropsten.infura.io/alethio --build-arg CONNECTION_TYPE=json_rpc --build-arg BASE_URL=/ . -t block_explorer
```

then run the image example on ropsten:

```
docker run -p 8080:8080 block_explorer
```
