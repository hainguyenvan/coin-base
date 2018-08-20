class Address {
    constructor(id, name) {
        this.id = id;
        this.name = name
    }
}

class Transactions {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}

module.exports = {
    Transactions: Transactions,
    Address: Address
};