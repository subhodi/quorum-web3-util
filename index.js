'use strict';
const Web3 = require('web3');
let web3 = new Web3();

const currentNode = process.env.currentNode;
const config = require('./config').config;
const contractConfig = require('./contract-config').config;

const deployContractUtil = require('./helper/deploy-contract');
const transactionUtil = require('./helper/transaction');


console.log('Connecting to ' + currentNode);
web3 = new Web3(new Web3.providers.HttpProvider(config[currentNode].url));
web3.isConnected() ? console.log('Web3 is connected to ' + config[currentNode].url) : console.log('Web3 connection failed ' + config[currentNode].url);
global.web3 = web3;  // marking web3 global

//block event
const filter = web3.eth.filter('latest');
filter.watch(function (error, result) {
    const block = web3.eth.getBlock(result, true);
    console.log('current block #' + block.number);
    block.transactions.forEach(function (tx) {
        console.log('\x1b[32m', JSON.stringify({ 'txID': tx.hash, 'validTime': block.timestamp }));
        console.log('\x1b[0m');
    });
});

// create and deploy and send transaction
let keyvalContract = contractConfig.keyval;
deployContractUtil.deployContract(keyvalContract.name, keyvalContract.args, [config.node_1.publicKey, config.node_2.publicKey]).then(contractInstance => {
    keyvalContract.instance = contractInstance;
    transactionUtil.sendTransaction(keyvalContract.instance, 'set', [], [web3.eth.accounts[0], 'Mike']).then(txID => {
        console.log('Transaction sent' + txID)
    }).catch(err => {
        console.log(err.toString());
    })
}).catch(err => {
    console.log(err.toString());
});








