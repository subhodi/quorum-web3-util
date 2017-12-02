const fs = require('fs');
const solc = require('solc');

deployContract = function (contractName, args, privateFor) {
    const input = fs.readFileSync(__dirname + '/../contracts/' + contractName + '.sol');
    const output = solc.compile(input.toString(), 1);
    const bytecode = '0x' + output.contracts[':' + contractName + ''].bytecode;
    const abi = JSON.parse(output.contracts[':' + contractName + ''].interface);
    const contractInstance = web3.eth.contract(abi);
    return new Promise(function (resolve, reject) {
        contractInstance.new(args, {
            from: web3.eth.accounts[0],
            data: bytecode,
            gas: 3000000,
            privateFor: privateFor
        }, function (err, contract) {
            if (!err) {
                if (!contract.address) {
                    console.log(contract.transactionHash)
                } else {
                    console.log('Contract deployed at' + contract.address);
                    resolve(contract);
                }
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    deployContract
}