const bodyParser = require('body-parser');
const Express = require('express');

const BlockChain = require('./blockchain');

const HTTP_PORT = 3001;

const initHttpServer = function (httpPort) {
    const app = Express();
    app.use(bodyParser.json);
    let blockChain = new BlockChain();

    app.get('/', (req, res) => {
        res.send({
            'msg': 'Server successed'
        });
    });

    // get all blocks
    app.get('/blocks', (req, res) => {
        res.send(blockChain.chains);
    });


    // mine block
    // app.post('mineBlock', (req, res) => {
    //     const newBock = blockChain.generateNextBlock(req.body.data);
    // });

    // get all peers


    app.listen(httpPort, function () {
        console.log('Listening http on port: http://localhost:' + httpPort);
    });
}

initHttpServer(HTTP_PORT);