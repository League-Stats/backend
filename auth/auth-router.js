const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../auth/secret');
const Users = require('../users/users-model');

router.post('/register', async (req, res) => {
    try{
        const { username } = req.body;
        const check = await Users.findBy({username: username});
        if(check.length === 0){
            try{
                const user = req.body;
                const hash = bcrypt.hashSync(user.password, 4);
                user.password = hash;
                const saved = await Users.add(user);
                res.status(200).json(saved)
            } catch(error){
                res.status(500).json({ message: "Error Registering" })
            }
        } else {
            res.status(409).json({ message: "User already exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Error checking"})
    }
})
 
router.post('/login', async (req, res) => {
    try{
        let { username, password } = req.body;
        const user = await Users.findBy({ username }).first()
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user);
            res.status(200).json({
                message: `welcome ${user.username}`,
                token,
            });
        } else {
            res.status(500).json({ message: 'Invalid Credentials' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Logging In, error'})
    }
})

generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        password: user.password
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;