const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    try {
        const decode = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});
        if(!user) {
            throw new Error("Authentication failed");
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(error) {
        res.status(401).send('Please authenticate');
    }
}

module.exports = auth