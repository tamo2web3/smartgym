import web3 from './web3';

import SmartGymContract from './build/SmartGymContract.json';

const instance = new web3.eth.Contract(
  SmartGymContract.abi,
  '0x915f823b77da32EA19f88bE3E95286cC4a44fC7B'
);

export default instance;
