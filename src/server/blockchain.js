const Block = require('./block');
const Transactions = require('./transactions').Transactions;
const Address = require('./transactions').Address;

const DIFFICULTY = 3;
const MINIG_REWARD = 100;

class BlockChain {

    constructor() {
        this.chains = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    createGenesisBlock() {
        let timestamp = new Date().getTime();
        return new Block(0, '', timestamp, {});
    }

    getLastestBlock() {
        return this.chains[this.chains.length - 1];
    }

    getLastestPendingBlock() {
        return this.pendingTransactions[this.pendingTransactions.length - 1];
    }

    generateNextBlock(tx) {
        let previousHash = this.getLastestBlock().hash;
        let index = this.getLastestBlock().index + 1;
        let timestamp = new Date().getTime();
        let transactions = tx;
        let block = new Block(index, previousHash, timestamp, transactions);
        return block;
    }

    addBlockToChain(block) {
        if (!this.isValidNewBlock(block, this.getLastestBlock())) {
            return false;
        }
        block.mineBlock(DIFFICULTY);
        this.chains.push(block);
        return true;
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
        return true;
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

    createTransaction(transaction) {
        transaction.timestamp = new Date().getTime();
        this.pendingTransactions.push(transaction);
    }

    // Mining data
    minePendingTransactions(miningRewarAddress) {
        let tx = this.getLastestPendingBlock();
        console.log('Tx: ', tx);
        let from = tx.from;
        // Valid amout of sender
        let blance = this.getBlanceOfAddress(from);
        if (blance <= 0 || blance < tx.amount) {
            console.log('Blance of sender invalid.Blance: ' + blance + ', Amount: ' + tx.amount);
            return false;
        }

        // Mining block
        let lastestBlock = this.getLastestBlock();
        let block = new Block(lastestBlock.index + 1, lastestBlock.hash, new Date().getTime(), tx);
        block.mineBlock(DIFFICULTY);
        this.chains.push(block);

        // Add block rewar
        let mineRewarTx = new Transactions({}, miningRewarAddress, MINIG_REWARD);
        lastestBlock = this.getLastestBlock();
        let mineRewarBlock = new Block(lastestBlock.index + 1, lastestBlock.hash, new Date().getTime(), mineRewarTx);
        mineRewarBlock.mineBlock(DIFFICULTY);
        this.chains.push(mineRewarBlock);

        // Remove pending transactions with done
        let index = this.pendingTransactions.indexOf(tx);
        if (index > -1) {
            this.pendingTransactions.splice(index, 1);
        }

        return true;
    }

    getBlanceOfAddress(address) {
        let blance = 0;
        for (const block of this.chains) {
            let tx = block.transactions;
            if ((tx.from != undefined) && (tx.from.id != undefined) && (tx.from.id == address.id)) {
                blance -= tx.amount;
            }
            if ((tx.to != undefined) && (tx.to.id != undefined) && (tx.to.id == address.id)) {
                blance += tx.amount;
            }
        }
        return blance;
    }
}


module.exports = new BlockChain();