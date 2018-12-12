# EthStats Lite

> NOTICE   
> This repo is a big piece of work in progress.  
> We are currently adding documentation and cleaning up the code.  
> Working branch is [prepare-initial-release](https://github.com/Alethio/ethstats-lite-explorer/tree/prepare-initial-release)

An Ethereum open source, decentralized block explorer. You can deploy it anywhere you want and connect to the JSONRPC interface of your choice.

The project is built using [Vue.js](https://vuejs.org/) and [BulmaCSS](https://bulma.io/).

# Documentation

## Structure

main.js defines the library functions. You will mainly need lib_goToBlock, lib_goToAccount, lib_UID, lib_getTransaction, lib_getBlock. those functions are avaliable to all Vue components instantiated in the project.

router.js defines the routes of the webapp, mainly /block, /account, /tx.

## Data

The data that are available through the project are:

* block: Same as web3js definition of a block (Cached)
* transaction: Same as web3js definition of a transaction with embedded receipt. (Cached)
* account: has the fields balance, bytecode and type. (Not cached)

## Documentation

Check our tutorials about:
* How to embed (Coming soon)
* How to extend (Coming soon)

# Getting started

## Env variables
```
VUE_APP_CONNECTION_TYPE='json_rpc'
VUE_APP_NODE_URL='https://mainnet.infura.io/v3/d70ece33c9754843b5181a4c07f49a4f'
VUE_APP_BASE_URL='/'
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


# License

Copyright 2018 <>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
