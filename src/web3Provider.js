import Web3 from 'web3';
const CONNECTION_JSON_RPC = 'json_rpc';
const CONNECTION_WEB_SOCKET = 'ws';

let w3 = null;
// fall back on mainnet infura
const connectionType = process.env.VUE_APP_CONNECTION_TYPE || CONNECTION_JSON_RPC;
const nodeUrl = process.env.VUE_APP_NODE_URL || 'https://mainnet.infura.io/alethio';
const nodeUser = process.env.VUE_APP_NODE_USER;
const nodePass = process.env.VUE_APP_NODE_PASS;

// const nodeUrl = process.env.NODE_URL || 'http://localhost:32770/jsonrpc';

// We check if Metamask or someone else has already injected a web3 instance
// Remove this line if you want to direcly inject your own web3
// if (typeof web3 !== 'undefined' || false) {
//   w3 = new Web3(web3.currentProvider);
// } else {
  switch (connectionType) {
    case CONNECTION_JSON_RPC:
      w3 = new Web3(new Web3.providers.HttpProvider(nodeUrl, 0, nodeUser, nodePass));
      break;
    case CONNECTION_WEB_SOCKET:
      w3 = new Web3(new Web3.providers.WebsocketProvider(nodeUrl));
      break;
    default:
      break;
  }
// }

const getWeb3 = function () {
    return w3;
};

export default getWeb3;
