#League Stats

##Regions:
- **BR1** *br1.api.riotgames.com*
- **EUN1** *eun1.api.riotgames.com*
- **EUW1** *euw1.api.riotgames.com*
- **JP1** *jp1.api.riotgames.com*
- **KR** *kr.api.riotgames.com*
- **LA1** *la1.api.riotgames.com*
- **LA2** *la2.api.riotgames.com*
- **NA1** *na1.api.riotgames.com*

### Get encrypted summonerID
    /lol/summoner/v4/summoners/by-name/{summonerName}

Response:

    {
        "profileIconId": 23,
        "name": "Doxxx",
        "puuid": "uAJFpIiGAWJiNWnqbjXHuSS8oUHOeKWQ7ndmwtgeMNAtcWVG5JVSnta0OPsTakYDfkhubO8Lqpk95Q",
        "summonerLevel": 157,
        "accountId": "k13DmBlAEhcgNN6k7r2HybaKVlpx0NspbjSZego1iUdrO3FMsVTHX7wo",
        "id": "X8W5FK2jVbdcYRnC-orcShdi3EXedRZ2d15LahctmyXZhXs",
        "revisionDate": 1576053471000
    }

    id: X8W5FK2jVbdcYRnC-orcShdi3EXedRZ2d15LahctmyXZhXs

### Ranked Ladder
    /lol/league-exp/v4/entries/{queue}/{tier}/{division}

Queues:

    RANKED_SOLO_5x5
    RANKED_FLEX_SR

Tier:

    CHALLENGER
    GRANDMASTER
    MASTER
    DIAMOND
    PLATINUM
    GOLD
    SILVER
    BRONZE
    IRON

Division:

    I
    II
    III
    IV

Page (optional):

    int

Response:

    [
        {
            "queueType": "RANKED_SOLO_5x5",
            "summonerName": "Cuzz",
            "hotStreak": true,
            "wins": 410,
            "veteran": true,
            "losses": 239,
            "rank": "I",
            "tier": "CHALLENGER",
            "inactive": false,
            "freshBlood": false,
            "leagueId": "ba73b86b-97c9-3dfc-856e-88777fec7e56",
            "summonerId": "GgIdk5-zXSAC4mXt0npufqG6PQ8IJSGBIaT49rfET8cD_DY",
            "leaguePoints": 1589
        },
        {
            "queueType": "RANKED_SOLO_5x5",
            "summonerName": "Doxxx",
            "hotStreak": true,
            "wins": 776,
            "veteran": true,
            "losses": 668,
            "rank": "I",
            "tier": "CHALLENGER",
            "inactive": false,
            "freshBlood": false,
            "leagueId": "ba73b86b-97c9-3dfc-856e-88777fec7e56",
            "summonerId": "X8W5FK2jVbdcYRnC-orcShdi3EXedRZ2d15LahctmyXZhXs",
            "leaguePoints": 1577
        },
        ...
    }

### A summoner's ranks

    /lol/league/v4/entries/by-summoner/{encryptedSummonerId}

Response:

    [
        {
            "queueType": "RANKED_FLEX_SR",
            "summonerName": "ZOEKlNG",
            "hotStreak": true,
            "wins": 14,
            "veteran": false,
            "losses": 3,
            "rank": "I",
            "tier": "PLATINUM",
            "inactive": false,
            "freshBlood": false,
            "leagueId": "a0d5e1f0-2bb4-11e9-823d-c81f66e41892",
            "summonerId": "aIYRE0LmSvHZLeGDYRTAovwI8tIYhUaQdMXRIY8GdJH3FE0",
            "leaguePoints": 75
        },
        {
            "queueType": "RANKED_SOLO_5x5",
            "summonerName": "ZOEKlNG",
            "hotStreak": false,
            "wins": 217,
            "veteran": true,
            "losses": 138,
            "rank": "I",
            "tier": "CHALLENGER",
            "inactive": false,
            "freshBlood": false,
            "leagueId": "ba73b86b-97c9-3dfc-856e-88777fec7e56",
            "summonerId": "aIYRE0LmSvHZLeGDYRTAovwI8tIYhUaQdMXRIY8GdJH3FE0",
            "leaguePoints": 1200
        }
    ]

### Server Status

    /lol/status/v3/shard-data

Response:

    {
        "name": "Republic of Korea",
        "region_tag": "kr1",
        "hostname": "prod.kr.lol.riotgames.com",
        "services": [
            {
                "status": "online",
                "incidents": [
                    {
                        "active": true,
                        "created_at": "2019-11-07T06:21:56.495Z",
                        "id": 13964,
                        "updates": [
                            {
                                "severity": "info",
                                "author": "",
                                "created_at": "2019-11-07T06:21:56.495Z",
                                "translations": [],
                                "updated_at": "2019-11-07T06:23:36.458Z",
                                "id": "5dc3b804f4322c39bc2bd430",
                                "content": "현재 RP선물하기 기능에 문제를 확인하여 비활성화 하였습니다.  이용에 불편을 드려서 죄송합니다.",
                                "heading": "RP 선물하기 기능 비활성화 안내"
                            }
                        ]
                    },
                    {
                        "active": true,
                        "created_at": "2019-12-16T14:41:08.708Z",
                        "id": 14283,
                        "updates": [
                            {
                                "severity": "info",
                                "author": "",
                                "created_at": "2019-12-16T14:41:08.708Z",
                                "translations": [],
                                "updated_at": "2019-12-16T14:41:08.708Z",
                                "id": "5df79784f0d0a94edc0a8437",
                                "content": "현재 계정 관련한 안내 이메일이 정상적으로 발송되지 않는 문제를 확인해 해결 중입니다. 양해 부탁드립니다.",
                                "heading": "계정 관련 이메일 문제"
                            }
                        ]
                    }
                ],
                "name": "Game",
                "slug": "game"
            },
            {
                "status": "online",
                "incidents": [],
                "name": "Store",
                "slug": "store"
            },
            {
                "status": "online",
                "incidents": [],
                "name": "Website",
                "slug": "website"
            },
            {
                "status": "online",
                "incidents": [],
                "name": "Client",
                "slug": "client"
            }
        ],
        "slug": "kr",
        "locales": [
            "ko_KR"
        ]
    }

### Match History

    /lol/match/v4/matchlists/by-account/{encryptedAccountId}

Optional:

    champion - int
    queue - int (ARAM = 450, RANKED_SOLO = 420, RANKED_FLEX = ???, ...)
    endTime - long
    beginTime - long
    endIndex - int
    beginIndex - int

Response:

    {
        "matches": [
            {
                "lane": "MID",
                "gameId": 4020668522,
                "champion": 222,
                "platformId": "KR",
                "timestamp": 1576077797146,
                "queue": 450,
                "role": "DUO_CARRY",
                "season": 13
            },
            {
                "lane": "MID",
                "gameId": 3981305539,
                "champion": 61,
                "platformId": "KR",
                "timestamp": 1574023900045,
                "queue": 420,
                "role": "SOLO",
                "season": 13
            },
            {
                "lane": "NONE",
                "gameId": 3981221766,
                "champion": 61,
                "platformId": "KR",
                "timestamp": 1574015154046,
                "queue": 420,
                "role": "DUO_SUPPORT",
                "season": 13
            },
            ...
        ]
    }

### Match Details

    /lol/match/v4/matches/{matchId}

Response:
https://pastebin.com/1m43AUfL

### Live Game

    /lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}

Response:

    {
        "gameId": 3244321692,
        "gameStartTime": 1577222279421,
        "platformId": "NA1",
        "gameMode": "CLASSIC",
        "mapId": 11,
        "gameType": "MATCHED_GAME",
        "gameQueueConfigId": 420,
        "observers": {
            "encryptionKey": "E4Syxiqdl3e59AB7v2yF6rkJnNvKKhsF"
        },
        "participants": [
            {
                "profileIconId": 4230,
                "championId": 164,
                "summonerName": "Shamwwow",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8010,
                        9111,
                        9104,
                        8014,
                        8401,
                        8473,
                        5005,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8400
                },
                "spell2Id": 12,
                "teamId": 100,
                "spell1Id": 4,
                "summonerId": "RX8qkr_HPys19aqnitdNHrPxMSAsQ-IRYo0LaCMbJAPnnD4"
            },
            {
                "profileIconId": 29,
                "championId": 82,
                "summonerName": "CHARIZARDLOVER95",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8010,
                        9111,
                        9105,
                        8014,
                        8473,
                        8453,
                        5008,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8400
                },
                "spell2Id": 12,
                "teamId": 100,
                "spell1Id": 4,
                "summonerId": "rGWGq8vmmxtMMgSFY302aE-X_hqlss14iSD242zwgWNfh5be"
            },
            {
                "profileIconId": 4,
                "championId": 68,
                "summonerName": "BananaSundaes",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8100,
                    "perkIds": [
                        8124,
                        8126,
                        8138,
                        8134,
                        8232,
                        8233,
                        5008,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8200
                },
                "spell2Id": 11,
                "teamId": 100,
                "spell1Id": 4,
                "summonerId": "CnuqB5xr1ILW82CclfmJ50TAdaDD9ils3T7amZyjssTgmxc"
            },
            {
                "profileIconId": 3440,
                "championId": 201,
                "summonerName": "We All Try",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8400,
                    "perkIds": [
                        8465,
                        8463,
                        8473,
                        8242,
                        8410,
                        8313,
                        5005,
                        5003,
                        5002
                    ],
                    "perkSubStyle": 8300
                },
                "spell2Id": 14,
                "teamId": 100,
                "spell1Id": 4,
                "summonerId": "wpuPiEtwmhr32p05PEO05JByTS1riN5-vF0IJtrnXDXfhZs"
            },
            {
                "profileIconId": 4248,
                "championId": 523,
                "summonerName": "TL Tactical",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8005,
                        9101,
                        9103,
                        8014,
                        8304,
                        8345,
                        5005,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8300
                },
                "spell2Id": 7,
                "teamId": 100,
                "spell1Id": 4,
                "summonerId": "wY0UKqFROvm9uJ5yRH6-f5kbxPikbCG9-cT-8gBJt2WUfmcO"
            },
            {
                "profileIconId": 1437,
                "championId": 235,
                "summonerName": "Zenden",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8200,
                    "perkIds": [
                        8214,
                        8226,
                        8210,
                        8237,
                        8473,
                        8453,
                        5008,
                        5008,
                        5001
                    ],
                    "perkSubStyle": 8400
                },
                "spell2Id": 21,
                "teamId": 200,
                "spell1Id": 4,
                "summonerId": "1dot92W-10aLewpdL4pM1owZxdWClZhkBikuZWN-TX3_PIM"
            },
            {
                "profileIconId": 3151,
                "championId": 21,
                "summonerName": "Cody Pog",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8005,
                        9101,
                        9103,
                        8014,
                        8304,
                        8345,
                        5005,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8300
                },
                "spell2Id": 4,
                "teamId": 200,
                "spell1Id": 7,
                "summonerId": "ETzBnNQo8z_kSsMJGitXpM39bGCqXvpjqm0TA2X9tl_J"
            },
            {
                "profileIconId": 4467,
                "championId": 59,
                "summonerName": "Metaphor",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8010,
                        9111,
                        9104,
                        8014,
                        8105,
                        8126,
                        5005,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8100
                },
                "spell2Id": 11,
                "teamId": 200,
                "spell1Id": 4,
                "summonerId": "DDpYnUmN8-VRAwniqFzixjObiQHd96dGM3JjdveHiSD7OmU"
            },
            {
                "profileIconId": 0,
                "championId": 266,
                "summonerName": "1BANG",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8000,
                    "perkIds": [
                        8010,
                        9111,
                        9105,
                        8014,
                        8139,
                        8135,
                        5008,
                        5008,
                        5003
                    ],
                    "perkSubStyle": 8100
                },
                "spell2Id": 14,
                "teamId": 200,
                "spell1Id": 4,
                "summonerId": "CzmA2bAEMQl3JxFHBcurR_f0HN1vGtD8uqyCzSPWozhhntVp"
            },
            {
                "profileIconId": 29,
                "championId": 13,
                "summonerName": "selfish laner ",
                "gameCustomizationObjects": [],
                "bot": false,
                "perks": {
                    "perkStyle": 8200,
                    "perkIds": [
                        8230,
                        8226,
                        8210,
                        8236,
                        8139,
                        8135,
                        5008,
                        5008,
                        5002
                    ],
                    "perkSubStyle": 8100
                },
                "spell2Id": 12,
                "teamId": 200,
                "spell1Id": 4,
                "summonerId": "Z0NGd43B4PLmwuJJ-VWv9qy7CSx4NHkcDVvPulmaTocDZCRB"
            }
        ],
        "gameLength": 1164,
        "bannedChampions": [
            {
                "teamId": 100,
                "championId": 142,
                "pickTurn": 1
            },
            {
                "teamId": 100,
                "championId": 246,
                "pickTurn": 2
            },
            {
                "teamId": 100,
                "championId": 238,
                "pickTurn": 3
            },
            {
                "teamId": 100,
                "championId": 30,
                "pickTurn": 4
            },
            {
                "teamId": 100,
                "championId": 203,
                "pickTurn": 5
            },
            {
                "teamId": 200,
                "championId": 84,
                "pickTurn": 6
            },
            {
                "teamId": 200,
                "championId": 131,
                "pickTurn": 7
            },
            {
                "teamId": 200,
                "championId": 122,
                "pickTurn": 8
            },
            {
                "teamId": 200,
                "championId": 89,
                "pickTurn": 9
            },
            {
                "teamId": 200,
                "championId": -1,
                "pickTurn": 10
            }
        ]
    }