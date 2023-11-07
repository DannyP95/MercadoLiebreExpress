const express = require('express');
const path = require('path');
const route = express.Router();

const mainController = require('../controller/mainController.js')

route.get('/', mainController.home)

route.get('/session', mainController.session)

route.get('/sessionTotal', mainController.sessionCount)

route.get('/checked', mainController.checked)


module.exports = route  
