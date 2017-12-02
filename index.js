'use strict';
const Web3 = require('web3');
let web3 = new Web3();

const config = require('./config').config;
const deployContractUtil = require('./helper/deploy-contract');
const currentNode = process.env.currentNode;

console.log('Connecting to ' + currentNode);
web3 = new Web3(new Web3.providers.HttpProvider(config[currentNode].url));
web3.isConnected() ? console.log('Web3 is connected to ' + config[currentNode].url) : console.log('Web3 connection failed ' + config[currentNode].url);

let DoNothingContract;
deployContractUtil.deployContract(web3).then(contractInstance => {
    DoNothingContract = contractInstance;
}).catch(err => {
    console.log(err.toString());
});






