const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const summonerRouter = require('./summoner/summoner-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/summoner', summonerRouter);

server.get('/', (req, res) => {
    res.send('alive')
});

module.exports = server;