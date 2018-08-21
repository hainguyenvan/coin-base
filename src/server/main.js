const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

const MinerManage = require('./miner');
const blockchain = require('./blockchain');
const Address = require('./transactions').Address;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const router = express.Router();

const HTTP_PORT = 3002;
const minerList = MinerManage.MinerList;

router.get('/', function (req, res) {
    res.json({
        msg: 'Welcome to our api !'
    });
});

// miner
router.get('/miners', (req, res) => {
    res.json(minerList.getMinerList());
});

router.post('/addMiner', (req, res) => {
    let name = req.body.name;
    if (name == undefined) {
        res.json({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }
    minerList.addMiner(name);
    res.json({
        status: 200,
        msg: 'Successed !'
    })
});

// transactions
router.post('/addTransactions', (req, res) => {
    let tx = req.body;
    blockchain.createTransaction(tx);
    res.json({
        msg: 'Successed !'
    })
});

// get tx
router.get('/txs', (req, res) => {
    res.json(blockchain.pendingTransactions);
});

// mining
router.post('/mining', (req, res) => {
    let miningRewarAddress = req.body;
    console.log('Address : ', miningRewarAddress);
    blockchain.minePendingTransactions(miningRewarAddress);
    res.json({
        msg: 'Successed !'
    })
});

// get all blocks
router.get('/blocks', (req, res) => {
    res.json(blockchain.chains);
});

// get blance
router.get('/blance/:id', (req, res) => {
    let addressId = req.params.id;
    let address = new Address(addressId, '');
    let blance = blockchain.getBlanceOfAddress(address);
    res.json({
        blance: blance,
        msg: 'Successed !'
    });
});

app.use(cors());
app.use('/api', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);