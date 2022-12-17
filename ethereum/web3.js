import Web3 from 'web3';
const HDWalletProvider = require('@truffle/hdwallet-provider');

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  console.log("We are in the browser and metamask is running");
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);

} else {
  console.log("We are on the server OR the user is not running metamask");
  const provider = new HDWalletProvider(
    'lobster inflict trip expose sponsor symbol mimic airport giraffe nominee any case',
    'https://goerli.infura.io/v3/02057554080e4832bc58711a77af18c3'
  );
  web3 = new Web3(provider);
}

export default web3;
