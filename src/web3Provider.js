import Web3 from 'web3';

let w3 = null;

// We check if Metamask or someone else has already injected a web3 instance
// Remove this line if you want to direcly inject your own web3
if (typeof web3 !== 'undefined') {
  w3 = new Web3(web3.currentProvider);
} else {
  // We inject our own web3 instance specifying the address, could be for eg localhost:4545 for a local node..
  w3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/d70ece33c9754843b5181a4c07f49a4f'));
}

const getWeb3 = function () {
  return (w3);
};

export default getWeb3;
