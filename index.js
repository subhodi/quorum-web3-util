'use strict';
const Web3 = require('web3');
let web3 = new Web3();

const currentNode = process.env.currentNode;
const config = require('./config').config;
const contractConfig = require('./contract-config').config;

const deployContractUtil = require('./helper/deploy-contract');

console.log('Connecting to ' + currentNode);
web3 = new Web3(new Web3.providers.HttpProvider(config[currentNode].url));
web3.isConnected() ? console.log('Web3 is connected to ' + config[currentNode].url) : console.log('Web3 connection failed ' + config[currentNode].url);

let keyvalContract = contractConfig.keyval;

deployContractUtil.deployContract(web3, keyvalContract.name, keyvalContract.args, [config.node_1.publicKey, config.node_2.publicKey]).then(contractInstance => {
    keyvalContract.instance = contractInstance;
}).catch(err => {
    console.log(err.toString());
});






