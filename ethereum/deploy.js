const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledSmartGym = require('../ethereum/build/SmartGymContract.json');

const bytecode = compiledSmartGym.evm.bytecode.object;
const abi = compiledSmartGym.abi;
const privatekey = '5c0efd8b91bbde1e5ef4718e889b6851ee0114a9a43e3e65f333156a1d9a1871';
const provider = new HDWalletProvider(
  'lobster inflict trip expose sponsor symbol mimic airport giraffe nominee any case',
  'https://goerli.infura.io/v3/02057554080e4832bc58711a77af18c3'
);

const address = '0x308d0D797855CC5cD9E9aE23936c12fe902a03a7';
const web3 = new Web3(provider);

//deploy contract
const deploy = async () => {

  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const incrementer = new web3.eth.Contract(abi);

  const incrementerTx = incrementer.deploy({
    data: bytecode
  });

  const createTransaction = await web3.eth.accounts.signTransaction({
      from: address,
      data: incrementerTx.encodeABI(),
      gas: '5000000',
    },
    privatekey
  );

  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  //console.log(abi);
  console.log('Contract deployed at address', createReceipt.contractAddress);
  provider.engine.stop();
};

deploy();
