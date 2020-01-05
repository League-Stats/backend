const router = require('express').Router();

const Fav = require('./favorites-model');
const restricted = require('../../auth/restricted-middleware');

router.get('/favorites', restricted, async (req, res) => {
    try{
        const region = req.body.summonerRegion;
        const added = await Fav.viewAll(req.decodedToken.subject, region);
        res.status(200).json({ added });
    }catch (error){
        console.log(error);
        res.status(500).json({ message: "failed to retrieve favorites" });
    }
})

router.post('/favorites', restricted, async (req, res) => {
    try{
        const name = req.body.summonerName;
        const region = req.body.summonerRegion;
        const added = await Fav.add(name, region, req.decodedToken.subject);
        res.status(200).json({ added, message: `${name} added to ${region} region` });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "failed to add summoner to favorites" });
    }
})

router.delete('/favorites', restricted, async (req, res) => {
    try{
        const id = req.body.favoritesId
        const removed = await Fav.remove(id, req.decodedToken.subject)
        res.status(200).json({ removed, message: `Removed from favorites` });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "failed to delete summoner from favorites" });
    }
})

module.exports = router;