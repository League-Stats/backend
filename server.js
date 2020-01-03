const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const summonerRouter = require('./summoner/summoner-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter)
server.use('/api/summoner', summonerRouter);

server.get('/', (req, res) => {
    res.send('alive')
});

module.exports = server;