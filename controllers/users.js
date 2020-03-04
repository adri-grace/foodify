const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
    signup,
    login
}

async function login(req, res) {
    try {
        //find user in db by email
        const user = await User.findOne({ email: req.body.email });
        // if user does NOT exist, respond with 400
        if (!user) return res.status(400).json({ err: 'User not found' })
        //if user found, we compare the passwords
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                //if passwords match, create a token and send to the client
                const token = createJWT(user);
                res.json({ token })
            } else {
                // if password doesn't match, respond with 401
                return res.status(401).json({ err: 'Bad Credentials' });
            }
        })
    } catch (error) {
        res.status(500).json({ err: 'This cannot be completed at this time' });
    }
}

async function signup(req, res) {
    try {
        const user = await User.create(req.body);
        // res.json(user); // this will become the token from the JWT we'll add later
        // create token by passing in user document to createJWT
        const token = createJWT(user);
        // then we res.json({token})
        res.json({ token })
    } catch (error) {
        res.status(400).json(error);
    }
};

function createJWT(user) {
    return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}