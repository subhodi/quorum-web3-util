const fs = require('fs');
const solc = require('solc');

deployContract = function (web3) {
    const input = fs.readFileSync(__dirname + '/../contracts/DoNothing.sol');
    const output = solc.compile(input.toString(), 1);
    const bytecode = '0x' + output.contracts[':DoNothing'].bytecode;
    const abi = JSON.parse(output.contracts[':DoNothing'].interface);
    const DoNothing = web3.eth.contract(abi);
    return new Promise(function (resolve, reject) {
        const DoNothingContract = DoNothing.new({
            from: web3.eth.accounts[0],
            data: bytecode
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