const SHA256 = require("crypto-js/sha256");

class Block {

    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
        this.hash = this.getHash();
    }

    getHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }
}

module.exports = Block;