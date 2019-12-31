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
        const { data } = await axios.get(`${currentRegionApi}/lol/summoner/v4/summoners/by-name/${summonerName}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        summonerAccount = {
            id: data.id,
            accountId: data.accountId,
            name: data.name,
            profileIconId: data.profileIconId,
            summonerLevel: data.summonerLevel
        }

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
        const { data } = await axios.get(`${currentRegionApi}/lol/league/v4/entries/by-summoner/${summonerAccount.id}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        data.forEach(queue => {
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

    try{
        const { data } = await axios.get(`${currentRegionApi}/lol/match/v4/matchlists/by-account/${summonerAccount.accountId}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });
        res.status(200).json(data.matches);
    } catch(error) {
        res.status(400).json(error);
    }
})

server.get('/matchdetails', async (req, res) => {
    const matchId = req.body.matchId;

    if(!matchId){
        res.status(400).json({ message: "ERROR: matchId required"})
        return
    };

    try{
        const { data } = await axios.get(`${currentRegionApi}/lol/match/v4/matches/${matchId}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        let matchData = {
            queueId: data.queueId,
            participantIdentities: data.participantIdentities.map(smnr => {
                return {
                    player: {
                        summonerName: smnr.player.summonerName,
                        currentAccountId: smnr.player.currentAccountId,
                        profileIcon: smnr.player.profileIcon,
                        summonerId: smnr.player.summonerId
                    },
                    participantId: smnr.participantId
                }
            }),
            gameMode: data.gameMode,
            mapId: data.mapId,
            gameType: data.gameType,
            teams: data.teams.map(team => {
                return {
                    win: team.win,
                    baronKills: team.baronKills,
                    riftHeraldKills: team.riftHeraldKills,
                    teamId: team.teamId,
                    inhibitorKills: team.inhibitorKills,
                    towerKills: team.towerKills,
                    dragonKills: team.dragonKills
                }
            }),
            participants: data.participants.map(smnr => {
                return {
                    spell1Id: smnr.spell1Id,
                    participantId: smnr.participantId,
                    timeline: {
                        lane: smnr.timeline.lane,
                        participantId: smnr.timeline.participantId
                    },
                    spell2Id: smnr.spell2Id,
                    teamId: smnr.teamId,
                    stats: {
                        magicDamageDealtToChampions: smnr.stats.magicDamageDealtToChampions,
                        tripleKills: smnr.stats.tripleKills,
                        kills: smnr.stats.kills,
                        wardsKilled: smnr.stats.wardsKilled,
                        quadraKills: smnr.stats.quadraKills,
                        item2: smnr.stats.item2,
                        item3: smnr.stats.item3,
                        item0: smnr.stats.item0,
                        item1: smnr.stats.item1,
                        item6: smnr.stats.item6,
                        item4: smnr.stats.item4,
                        item5: smnr.stats.item5,
                        assists: smnr.stats.assists,
                        participantId: smnr.stats.participantId,
                        sightWardsBoughtInGame: smnr.stats.sightWardsBoughtInGame,
                        totalDamageDealtToChampions: smnr.stats.totalDamageDealtToChampions,
                        win: smnr.stats.win,
                        totalDamageDealt: smnr.stats.totalDamageDealt,
                        deaths: smnr.stats.deaths,
                        wardsPlaced: smnr.stats.wardsPlaced,
                        perkPrimaryStyle: smnr.stats.perkPrimaryStyle,
                        perkSubStyle: smnr.stats.perkSubStyle,
                        goldEarned: smnr.stats.goldEarned,
                        champLevel: smnr.stats.champLevel,
                        doubleKills: smnr.stats.doubleKills,
                        visionWardsBoughtInGame: smnr.stats.visionWardsBoughtInGame,
                        pentaKills: smnr.stats.pentaKills,
                        totalMinionsKilled: smnr.stats.totalMinionsKilled,
                    },
                    championId: smnr.championId
                }
            }),
            gameDuration: data.gameDuration,
            gameCreation: data.gameCreation
        }
        res.status(200).json(matchData);
    } catch(error) {
        console.log(error)
        res.status(400).json(error);
        return
    }
})

module.exports = server;