const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.status(201).send(user);  
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).send('User is not found');
        }
        res.send();
    }
    catch(error) {
        res.status(500).send();
    }
}

const updateUser = async (req, res) => {
    const {id}  = req.params;
    try {
        const userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        if(!userUpdated) {
            return res.status(404).send('User is not found');
        }
        res.send(userUpdated);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send('Invalid Credentials');
        }
        const token = await user.generateAuthToken();
        res.send({
            username: user.username,
            email: user.email,
            token
        });
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const userLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    }
    catch(error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports =  {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    userLogin,
    userLogout
}