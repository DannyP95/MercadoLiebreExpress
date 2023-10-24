const express = require('express');
const path = require('path');
const route = express.Router();

const mainController = require('../controller/mainController.js')

route.get('/', mainController.home)

route.get('/login', mainController.login)

route.get('/register', mainController.register)




module.exports = route  
