const express = require('express');
const path = require('path');
const mainController = require('../controller/mainController.js')
const route = express.Router();

route.get('/', mainController.home)

route.get('/login', mainController.login)

route.get('/register', mainController.register)

module.exports = route  
