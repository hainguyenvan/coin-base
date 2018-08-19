const Block = require('./block')

class BlockChain {

    constructor() {
        this.chains = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        let timestamp = new Date().getTime();
        return new Block(0, '', timestamp, '');
    }

    getLastestBlock() {
        return this.chains[this.chains.length - 1];
    }

    hashMatchesDifficulty(hash, difficulty) {
        
    }

    generateNextBlock(blockData) {
        let previousHash = this.getLastestBlock().hash;
        let index = this.getLastestBlock().index;
        let timestamp = new Date().getTime();
        let data = blockData;
        let block = new Block(index, previousHash, timestamp, data);
        return block;
    }

    isValidNewBlock(newBlock, previousBlock) {
        if (newBlock.index != previousBlock.index + 1) {
            console.log('Invalid index');
            return false;
        }

        if (previousBlock.hash != newBlock.previousHash) {
            console.log('Invalid previoushash');
            return false;
        }

        if (newBlock.hash != newBlock.getHash()) {
            console.log('Invalid hash');
            return false;
        }
    }

    isValidChain(block) {
        for (let i = 0; i < this.chains.length; i++) {
            let currentBlock = this.chains[i];
            let previousBlock = this.chains[i - 1];
            if (currentBlock.hash != currentBlock.getHash()) {
                console.log('Invalid hash in chains');
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                console.log('Invalid previous hash in chans');
                return false;
            }

            return true;
        }
    }

    replaceChain() {
        // TODO - HaiNV
        console.log('Replace chain');
    }
}


module.exports = BlockChain;