var Web3 = require('web3');
var web3 = new Web3();
var config = require('./config').config;
web3 = new Web3(new Web3.providers.HttpProvider(config.node_1.url));
web3.isConnected() ? console.log("Web3 is connected to " + config.node_1.url) : console.log("Web3 connection failed " + config.node_1.url);



