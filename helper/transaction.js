sendTransaction = function (contractInstance, functionName, privateFor, args) {
    return new Promise(function (resolve, reject) {
        contractInstance.set.sendTransaction(args[0], args[1], {
            from: web3.eth.accounts[0],
            gas: 3000000,
            privateFor: privateFor
        }, function (err, txID) {
            if (!err) {
                resolve(txID);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    sendTransaction
}