const express = require('express');
const path = require('path');
const usersController = require('../controller/usersController.js')
const route = express.Router();

route.get('/login', usersController.login)

route.get('/register', usersController.registerViews)

route.post('/register', usersController.register)

route.get('/profile', usersController.profile)



module.exports = route  