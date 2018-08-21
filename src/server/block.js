const SHA256 = require("crypto-js/sha256");

class Block {

    constructor(index, previousHash, timestamp, transactions) {
        this.index = index;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.nonce = 0;
        this.hash = this.getHash();
    }

    getHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        let hashSubStr = this.hash.substring(0, difficulty);
        let hashPattern = Array(difficulty + 1).join("0");
        while (hashSubStr != hashPattern) {
            hashSubStr = this.hash.substring(0, difficulty);
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

module.exports = Block;