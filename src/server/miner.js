const randomstring = require("randomstring");

class Miner {

    constructor(id, name) {
        this.id = id;
        this.name = name;
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
        return true;
    }
}

module.exports = {
    Miner: Miner,
    MinerList: MinerList
}