const SHA256 = require("crypto-js/sha256");

class Block {

    constructor(index, previousHash, timestamp, transactions) {
        this.index = index;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.hash = this.getHash();
    }

    getHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();
    }
}

module.exports = Block;