const router = require('express').Router();

const axios = require('axios');
const { RIOT_TOKEN } = process.env;
const regions = require('../util/constants/regions');

router.get('/profile/:region/:name', async (req, res) => {
    const { name } = req.params
    const caseSensRegion = req.params.region

    const region = caseSensRegion.toUpperCase()

    if(!name || !region){
        res.status(400).json({ message: "ERROR: summoner name and region required"})
        return
    };

    if(!regions[region]){
        res.status(400).json({ message: `ERROR: invalid region ${region}`})
        return
    };

    let currentRegionApi = regions[region];
    let summonerAccount = {};

    try{
        const getProfile = await axios.get(`${currentRegionApi}/lol/summoner/v4/summoners/by-name/${name}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        const profile = getProfile.data

        summonerAccount = {
            id: profile.id,
            accountId: profile.accountId,
            name: profile.name,
            profileIconId: profile.profileIconId,
            summonerLevel: profile.summonerLevel
        }

        let summonerRank = [];

        const getRank = await axios.get(`${currentRegionApi}/lol/league/v4/entries/by-summoner/${summonerAccount.id}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        const rank = getRank.data

        rank.forEach(queue => {
            let qType = "";
            if(queue.queueType === "RANKED_SOLO_5x5"){
                qType = "Solo/Duo"
            } else if (queue.queueType === "RANKED_FLEX_SR"){
                qType = "Flex 5v5"
            }
            summonerRank.push({
                queueType: qType,
                tier: queue.tier,
                rank: queue.rank,
                leaguePoints: queue.leaguePoints,
                wins: queue.wins,
                losses: queue.losses
            })
        })

        res.status(200).json({
            "name": summonerAccount.name,
            "icon": summonerAccount.profileIconId,
            "level": summonerAccount.summonerLevel,
            "rank": summonerRank
        })
    } catch(error) {
        res.status(400).json(error);
    }
})

router.get('/matchhistory/:region/:name', async (req, res) => {
    const { name } = req.params
    const caseSensRegion = req.params.region

    const region = caseSensRegion.toUpperCase()

    if(!name || !region){
        res.status(400).json({ message: "ERROR: summoner name and region required" })
        return
    };

    if(!regions[region]){
        res.status(400).json({ message: `ERROR: invalid region ${region}` })
        return
    };

    let currentRegionApi = regions[region];
    let summonerAccount = {};

    try{
        const getQueues = await axios(
            "https://static.developer.riotgames.com/docs/lol/queues.json",
        )

        const queues = getQueues.data

        const getProfile = await axios.get(`${currentRegionApi}/lol/summoner/v4/summoners/by-name/${name}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        const profile = getProfile.data

        summonerAccount = {
            id: profile.id,
            accountId: profile.accountId,
            name: profile.name,
            profileIconId: profile.profileIconId,
            summonerLevel: profile.summonerLevel
        }

        const getHistory = await axios.get(`${currentRegionApi}/lol/match/v4/matchlists/by-account/${summonerAccount.accountId}`, {
            headers: {
                "X-Riot-Token": RIOT_TOKEN
            }
        });

        const historyAll = getHistory.data.matches
        const history = historyAll.slice(0, 5)

        let results = await Promise.all(history.map(async match => {
            const { gameId } = match
            const region = match.platformId

            let details;
            let mlRolesMatch;
            let mlRolesTimeline;
            let rolesData;
            
            try {
                const getDetails = await axios.get(`${currentRegionApi}/lol/match/v4/matches/${gameId}`, {
                    headers: {
                        "X-Riot-Token": RIOT_TOKEN
                    }
                });
                details = getDetails.data
                // console.log(details.participantIdentities)
                mlRolesMatch = JSON.stringify(getDetails.data)
            } catch(err) {
                console.log(err)
            }

            if([420, 430, 400].indexOf(details.queueId) > -1){
                try {
                    const getTimelineData = await axios.get(`${currentRegionApi}/lol/match/v4/timelines/by-match/${gameId}`, {
                        headers: {
                            "X-Riot-Token": RIOT_TOKEN
                        }
                    });
                    mlRolesTimeline = JSON.stringify(getTimelineData.data)
                } catch(err) {
                    console.log(err)
                }

                try {
                    const getRoles = await axios.post(`https://hextechgg-mlroles-py.herokuapp.com/api/roleml`, {
                        match: mlRolesMatch,
                        timeline: mlRolesTimeline
                    });
                    rolesData = getRoles.data
                } catch(err) {
                console.log(err) 
                }
            }

            const convertQueueId = (queueId) => {
                const mode = queues.find(mode => mode.queueId === details.queueId).description.slice(0, -6)
                if(mode === "5v5 Ranked Solo"){
                    return "Ranked Solo" 
                } else if(mode === "5v5 ARAM"){
                    return "ARAM"
                } else {
                    return mode
                }
            }

            let participantIdentities = details.participantIdentities.map(smnr => {
                return {
                    player: {
                        summonerName: smnr.player.summonerName,
                        currentAccountId: smnr.player.currentAccountId,
                        profileIcon: smnr.player.profileIcon,
                        summonerId: smnr.player.summonerId,
                        participantId: smnr.participantId
                    }
                }
            })
            
            let participants = details.participants.map(smnr => {
                return {
                    spell1Id: smnr.spell1Id,
                    participantId: smnr.participantId,
                    timeline: {
                        lane: rolesData ? rolesData[`${smnr.participantId}`] : smnr.timeline.lane,
                        participantId: smnr.timeline.participantId
                    },
                    spell2Id: smnr.spell2Id,
                    teamId: smnr.teamId,
                    stats: {
                        participantId: smnr.stats.participantId,
                        win: smnr.stats.win,
                        item0: smnr.stats.item0,
                        item1: smnr.stats.item1,
                        item2: smnr.stats.item2,
                        item3: smnr.stats.item3,
                        item4: smnr.stats.item4,
                        item5: smnr.stats.item5,
                        item6: smnr.stats.item6,
                        kills: smnr.stats.kills,
                        deaths: smnr.stats.deaths,
                        assists: smnr.stats.assists,
                        doubleKills: smnr.stats.doubleKills,
                        tripleKills: smnr.stats.tripleKills,
                        quadraKills: smnr.stats.quadraKills,
                        pentaKills: smnr.stats.pentaKills,
                        totalDamageDealt: smnr.stats.totalDamageDealt,
                        magicDamageDealt: smnr.stats.magicDamageDealt,
                        physicalDamageDealt: smnr.stats.physicalDamageDealt,
                        trueDamageDealt: smnr.stats.trueDamageDealt,
                        largestCriticalStrike: smnr.stats.largestCriticalStrike,
                        totalDamageDealtToChampions: smnr.stats.totalDamageDealtToChampions,
                        magicDamageDealtToChampions: smnr.stats.magicDamageDealtToChampions,
                        totalDamageDealtToChampions: smnr.stats.totalDamageDealtToChampions,
                        magicDamageDealtToChampions: smnr.stats.magicDamageDealtToChampions,
                        physicalDamageDealtToChampions: smnr.stats.physicalDamageDealtToChampions,
                        trueDamageDealtToChampions: smnr.stats.trueDamageDealtToChampions,
                        totalHeal: smnr.stats.totalHeal,
                        totalUnitsHealed: smnr.stats.totalUnitsHealed,
                        damageSelfMitigated: smnr.stats.damageSelfMitigated,
                        damageDealtToObjectives: smnr.stats.damageDealtToObjectives,
                        damageDealtToTurrets: smnr.stats.damageDealtToTurrets,
                        visionScore: smnr.stats.visionScore,
                        timeCCingOthers: smnr.stats.timeCCingOthers,
                        totalDamageTaken: smnr.stats.totalDamageTaken,
                        magicalDamageTaken: smnr.stats.magicalDamageTaken,
                        physicalDamageTaken: smnr.stats.physicalDamageTaken,
                        trueDamageTaken: smnr.stats.trueDamageTaken,
                        goldEarned: smnr.stats.goldEarned,
                        goldSpent: smnr.stats.goldSpent,
                        turretKills: smnr.stats.turretKills,
                        inhibitorKills: smnr.stats.inhibitorKills,
                        totalMinionsKilled: smnr.stats.totalMinionsKilled,
                        neutralMinionsKilled: smnr.stats.neutralMinionsKilled,
                        neutralMinionsKilledTeamJungle: smnr.stats.neutralMinionsKilledTeamJungle,
                        neutralMinionsKilledEnemyJungle: smnr.stats.neutralMinionsKilledEnemyJungle,
                        totalTimeCrowdControlDealt: smnr.stats.totalTimeCrowdControlDealt,
                        champLevel: smnr.stats.champLevel,
                        visionWardsBoughtInGame: smnr.stats.visionWardsBoughtInGame,
                        sightWardsBoughtInGame: smnr.stats.sightWardsBoughtInGame,
                        wardsPlaced: smnr.stats.wardsPlaced,
                        wardsKilled: smnr.stats.wardsKilled,
                        firstBloodKill: smnr.stats.firstBloodKill,
                        firstTowerKill: smnr.stats.firstTowerKill,
                        firstInhibitorKill: smnr.stats.firstInhibitorKill,
                        perk0: smnr.stats.perk0,
                        perk0Var1: smnr.stats.perk0Var1,
                        perk0Var2: smnr.stats.perk0Var2,
                        perk0Var3: smnr.stats.perk0Var3,
                        perk1: smnr.stats.perk1,
                        perk1Var1: smnr.stats.perk1Var1,
                        perk1Var2: smnr.stats.perk1Var2,
                        perk1Var3: smnr.stats.perk1Var3,
                        perk2: smnr.stats.perk2,
                        perk2Var1: smnr.stats.perk2Var1,
                        perk2Var2: smnr.stats.perk2Var2,
                        perk2Var3: smnr.stats.perk2Var3,
                        perk3: smnr.stats.perk3,
                        perk3Var1: smnr.stats.perk3Var1,
                        perk3Var2: smnr.stats.perk3Var2,
                        perk3Var3: smnr.stats.perk3Var3,
                        perk4: smnr.stats.perk4,
                        perk4Var1: smnr.stats.perk4Var1,
                        perk4Var2: smnr.stats.perk4Var2,
                        perk4Var3: smnr.stats.perk4Var3,
                        perk5: smnr.stats.perk5,
                        perk5Var1: smnr.stats.perk5Var1,
                        perk5Var2: smnr.stats.perk5Var2,
                        perk5Var3: smnr.stats.perk5Var3,
                        perkPrimaryStyle: smnr.stats.perkPrimaryStyle,
                        perkSubStyle: smnr.stats.perkSubStyle,
                        statPerk0: smnr.stats.statPerk0,
                        statPerk1: smnr.stats.statPerk1,
                        statPerk2: smnr.stats.statPerk2,
                    },
                    championId: smnr.championId
                }
            })
    
            const mergeParticipantInfo = participantIdentities.map((item, i)=>{
                if(item.player.participantId === participants[i].participantId){
                    return Object.assign({},item,participants[i])
                }
            })   
    
            let matchData = {
                matchId: gameId,
                region: region,
                queueId: details.queueId,
                queueIdConverted: convertQueueId(details.queueId),
                participantsInfo: mergeParticipantInfo,
                gameMode: details.gameMode,
                mapId: details.mapId,
                gameType: details.gameType,
                teams: details.teams.map(team => {
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
                gameDuration: details.gameDuration,
                gameCreation: details.gameCreation
            }

            return {
                "match": match,
                "details": matchData
            }
        }))
        .then(data => {
            return data
        })

        res.status(200).json(results);
    } catch(error) {
        res.status(400).json(error);
    }
})

module.exports = router;