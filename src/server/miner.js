const randomstring = require('randomstring');
const blockchain = require('./blockchain');
const Transactions = require('./transactions').Transactions;
const Address = require('./transactions').Address;

const AMOUNT_DEFAULT = 100;

class Miner {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.amount = AMOUNT_DEFAULT
    }
}

class MinerList {

    constructor() {
        this.minerList = [];
    }

    addMiner(name) {
        let id = randomstring.generate(12);
        let miner = new Miner(id, name);
        this.minerList.push(miner);

        // Add block
        let from = new Address('', '');
        let to = new Address(id, name);
        let tx = new Transactions(from, to, AMOUNT_DEFAULT);
        let block = blockchain.generateNextBlock(tx);
        blockchain.addBlockToChain(block);
        return true;
    }
}

module.exports = {
    Miner: Miner,
    MinerList: new MinerList()
}