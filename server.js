const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const { RIOT_TOKEN } = process.env;

const regions = require('./util/constants/regions');

const router = express.Router()

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('alive')
});

server.get('/accountInfo', async (req, res) => {
    const summonerName = req.body.summonerName;
    const summonerRegion = req.body.summonerRegion;

    if(!summonerName || !summonerRegion){
        res.status(400).json({ message: "ERROR: summoner name and region required"})
        return
    };

    if(!regions[summonerRegion]){
        res.status(400).json({ message: `ERROR: invalid region ${summonerRegion}`})
        return
    };

    const currentRegionApi = regions[summonerRegion];

    try{
        const accountResponse = await axios.get(`${currentRegionApi}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });
        res.status(200).json(accountResponse.data);
    } catch(error) {
        res.status(400).json(error)
        return
    }
})

module.exports = server;