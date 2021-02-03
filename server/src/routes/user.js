const express = require('express');
const {createUser, deleteUser, updateUser, getUsers, userLogin, userLogout} = require('../controllers/user');
const auth = require('../middleware/auth');

const userRouter = new express.Router();

userRouter.post('/', createUser);

userRouter.delete('/:id', deleteUser);

userRouter.patch('/:id', updateUser);

userRouter.get('/', getUsers);

userRouter.post('/login', userLogin);

userRouter.post('/logout', auth, userLogout);

module.exports = userRouter;