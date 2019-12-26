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

let currentRegionApi;
let summonerAccount = {};

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

    currentRegionApi = regions[summonerRegion];

    try{
        const accountResponse = await axios.get(`${currentRegionApi}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });
        summonerAccount.id = accountResponse.data.id;
        summonerAccount.accountId = accountResponse.data.accountId;
        summonerAccount.name = accountResponse.data.name;
        summonerAccount.profileIconId = accountResponse.data.profileIconId;
        summonerAccount.summonerLevel = accountResponse.data.summonerLevel;
        res.status(200).json(summonerAccount);
    } catch(error) {
        res.status(400).json(error);
        return
    }
})

server.get('/rank', async (req, res) => {
    if(!summonerAccount.id || !summonerAccount.accountId){
        res.status(400).json({ message: "Missing AccountID or ID"})
    }

    let summonerRank = [];

    try{
        const accountResponse = await axios.get(`${currentRegionApi}/lol/league/v4/entries/by-summoner/${summonerAccount.id}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });
        accountResponse.data.forEach(queue => {
            summonerRank.push({
                queueType: queue.queueType,
                tier: queue.tier,
                rank: queue.rank,
                leaguePoints: queue.leaguePoints,
                wins: queue.wins,
                losses: queue.losses
            })
        })
        res.status(200).json(summonerRank);
    } catch(error) {
        res.status(400).json(error);
    }
})

server.get('/matchhistory', async (req, res) => {
    if(!summonerAccount.id || !summonerAccount.accountId){
        res.status(400).json({ message: "Missing AccountID or ID"})
    }

    let summonerMatchHistory = [];

    try{
        const accountResponse = await axios.get(`${currentRegionApi}/lol/match/v4/matchlists/by-account/${summonerAccount.accountId}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });
        console.log(accountResponse.data.matches)
        res.status(200).json(accountResponse);
    } catch(error) {
        res.status(400).json(error);
    }
})

module.exports = server;