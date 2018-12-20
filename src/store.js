import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const CONNECTION_JSON_RPC = 'json_rpc';
const defaultNodeUrls = [{ label: 'Mainnet', value: 'https://mainnet.infura.io/Alethio' },
  { label: 'Kovan', value: 'https://kovan.infura.io/Alethio' },
  { label: 'Rinkeby', value: 'https://rinkeby.infura.io/Alethio' },
  { label: 'Ropsten', value: 'https://ropsten.infura.io/Alethio' }];

const findNodeUrl = () => {
  let foundDeployUrl = false;
  let foundIndex = -1;
  const deployUrl = process.env.VUE_APP_NODE_URL;
  const debris = deployUrl.split('/');
  debris.pop();
  const choppedDeployUrl = debris.join('/');
  for (let i = 0; i <= defaultNodeUrls.length; i += 1) {
    const checkedUrlDebris = defaultNodeUrls[i].value.split('/');
    checkedUrlDebris.pop();
    const choppedCheckedUrl = checkedUrlDebris.join('/');
    if (choppedDeployUrl === choppedCheckedUrl) {
      foundDeployUrl = true;
      foundIndex = i;
      break;
    }
  }
  return { foundUrl: foundDeployUrl, atIndex: foundIndex };
};

const getNodeUrlsArray = () => {
  if (findNodeUrl().foundUrl) {
    return defaultNodeUrls;
  }
  defaultNodeUrls.push({ label: 'Deploy URL', value: process.env.VUE_APP_NODE_URL });
  return defaultNodeUrls;
};

const getPreselectedNodeUrl = () => {
  const checkForNode = findNodeUrl();
  if (checkForNode.foundUrl) {
    return defaultNodeUrls[checkForNode.atIndex];
  }
  return { label: 'Deploy URL', value: process.env.VUE_APP_NODE_URL };
};

const store = new Vuex.Store({
  state: {
    nodeUrl: process.env.VUE_APP_NODE_URL,
    connectionType: process.env.VUE_APP_CONNECTION_TYPE || CONNECTION_JSON_RPC,
    nodeUser: process.env.VUE_APP_NODE_USER,
    nodePass: process.env.VUE_APP_NODE_PASS,
    w3: null,
    nodeUrls: getNodeUrlsArray(),
    selectedUrl: getPreselectedNodeUrl(),
    blocks: {}, // Store cached blocks
    transactions: {}, // Store cached transactions
    pendingQueries: {}, // Store which blocks/tx are currently being queried
    lastBlock: -1,
    // We just store those for stats purpose
    totalBlocks: 0,
    totalTransactions: 0,
    countPending: 0,
    lastBlockFull: null,
    peers: 0,
    nodeType: null,
  },
  /*
  *  Mutations are used by the internal library and should not be called by someone else.
  */
  mutations: {
    setWeb3(state, createdWeb3) {
      state.w3 = createdWeb3;
    },
    setActiveUrl(state, url) {
      state.selectedUrl = url;
      state.nodeUrl = url.value;
    },
    setPending(state, key) {
      Vue.set(state.pendingQueries, key, true);
      state.countPending += 1;
    },
    removePending(state, key) {
      Vue.delete(state.pendingQueries, key);
      state.countPending -= 1;
    },
    storeBlock(state, block) {
      Vue.set(state.blocks, block.number, block);
      state.totalBlocks += 1;
    },
    storeTransaction(state, transaction) {
      Vue.set(state.transactions, transaction.hash, transaction);
      state.totalTransactions += 1;
    },
    setLastBlock(state, blockNumber) {
      if (state.lastBlock < blockNumber) {
        state.lastBlock = blockNumber;
      }
    },
    setLastBlockFull(state, block) {
      if (state.lastBlockFull) {
        if (state.lastBlockFull.number < block.number) {
          state.lastBlockFull = block;
        }
      } else {
        state.lastBlockFull = block;
      }
    },
    setPeers(state, count) {
      if (state.peers !== count) {
        state.peers = count;
      }
    },
    setNodeType(state, type) {
      if (state.nodeType !== type) {
        state.nodeType = type;
      }
    },
    setNodeUrl(state, url) {
      state.nodeUrl = url;
    },
    resetStats(state) {
      state.lastBlock = 0;
      state.lastBlockFull = 0;
      state.nodeType = null;
      state.peers = null;
    },
  },
  actions: {

  },
  getters: {
    connectionType: state => state.connectionType,
    nodeUrl: state => state.nodeUrl,
    nodeUser: state => state.nodeUser,
    nodePass: state => state.nodePass,
  },
});
export default store;
