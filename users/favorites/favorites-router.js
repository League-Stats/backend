const router = require('express').Router();

const Fav = require('./favorites-model');
const restricted = require('../../auth/restricted-middleware');

router.get('/favorites', restricted, async (req, res) => {
    try{
        // const user_id =
        console.log(currentUser)
        const region = req.body.summonerRegion;
        const added = await Fav.viewAll(user_id)
        res.status(200).json({ added })
    }catch (error){
        console.log(error);
        res.status(500).json({ message: "failed to retrieve favorites" });
    }
})

module.exports = router;