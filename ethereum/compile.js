const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'SmartGym.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    [source]: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

for (const contractName in output.contracts[source]) {

  const contractfile = output.contracts[source][contractName];

  fs.outputJsonSync(
    path.resolve(buildPath, contractName + '.json'),
    contractfile
  );

  //console.log(contractfile);
};
