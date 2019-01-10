import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

/* global CFG_INFURA, CFG_URL, CFG_USER, CFG_PASS */
const INFURA_PROJECT_ID = CFG_INFURA || process.env.VUE_APP_INFURA_PROJECT_ID || '';
const NODE_URL = CFG_URL || process.env.VUE_APP_NODE_URL;
const NODE_URL_USER = CFG_USER || process.env.VUE_APP_NODE_USER;
const NODE_URL_PASS = CFG_PASS || process.env.VUE_APP_NODE_PASS;
const defaultNodeUrls = [{ label: 'Mainnet', value: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}` },
  { label: 'Kovan', value: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}` },
  { label: 'Rinkeby', value: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}` },
  { label: 'Ropsten', value: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}` }];
const DEFAULT_LABELS = ['Mainnet', 'Kovan', 'Rinkeby', 'Ropsten'];
const DEFAULT_INFURA_URL = 'https://mainnet.infura.io/';

const findNodeUrl = () => {
  let foundDeployUrl = false;
  let foundIndex = -1;
  const deployUrl = `${process.env.VUE_APP_NODE_URL}${INFURA_PROJECT_ID}`;
  for (let i = 0; i < defaultNodeUrls.length; i += 1) {
    if (deployUrl.includes(defaultNodeUrls[i].value)) {
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
  defaultNodeUrls.push({
    label: NODE_URL,
    value: NODE_URL,
  });
  return defaultNodeUrls;
};

const getPreselectedNodeUrl = () => {
  const localSave = localStorage.getItem('nodeUrl');
  if (localSave && INFURA_PROJECT_ID) {
    const parsedSave = JSON.parse(localSave);
    if (DEFAULT_LABELS.indexOf(parsedSave.label) < 0) {
      if (NODE_URL !== parsedSave.value) {
        return { label: NODE_URL, value: NODE_URL };
      }
    }
    return parsedSave;
  }
  const checkForNode = findNodeUrl();
  if (checkForNode.foundUrl) {
    return defaultNodeUrls[checkForNode.atIndex];
  }
  return { label: 'Host:port', value: NODE_URL };
};

const getPreselectedWeb3Url = () => {
  const localSave = localStorage.getItem('nodeUrl');
  if (localSave && INFURA_PROJECT_ID) {
    return JSON.parse(localSave).value;
  }
  if (NODE_URL) {
    return NODE_URL;
  }
  return DEFAULT_INFURA_URL;
};

const store = new Vuex.Store({
  state: {
    nodeUrl: getPreselectedWeb3Url(),
    nodeUser: NODE_URL_USER,
    nodePass: NODE_URL_PASS,
    infuraProjectID: INFURA_PROJECT_ID,
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
      localStorage.setItem('nodeUrl', JSON.stringify(url));
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
      if (!state.lastBlockFull ||
        (block && block.number && state.lastBlockFull.number < block.number)) {
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
    nodeUrl: state => state.nodeUrl,
    nodeUser: state => state.nodeUser,
    nodePass: state => state.nodePass,
  },
});
export default store;
