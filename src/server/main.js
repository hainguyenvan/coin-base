const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MinerManage = require('./miner');
const BlockChain = require('./blockchain');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const router = express.Router();

const HTTP_PORT = 3002;
const blockChain = new BlockChain();
const minerList = new MinerManage.MinerList();

router.get('/', function (req, res) {
    res.send({
        msg: 'Welcome to our api !'
    });
});

// miner
router.get('/miners', (req, res) => {
    res.send({
        data: minerList.minerList
    });
});

router.post('/addMiner', (req, res) => {
    let name = req.body.name;
    if (name == undefined) {
        res.send({
            status: 400,
            msg: 'Not invalid field name !s'
        });
    }
    minerList.addMiner(name);
    res.send({
        status: 200,
        msg: 'Successed !'
    })
});

// get all blocks
router.get('/blocks', (req, res) => {
    res.send(blockChain.chains);
});


// mine block
// app.post('mineBlock', (req, res) => {
//     const newBock = blockChain.generateNextBlock(req.body.data);
// });

// get all peers

app.use('/api', router);
app.listen(HTTP_PORT);
console.log('Listening http on port: http://localhost:' + HTTP_PORT);