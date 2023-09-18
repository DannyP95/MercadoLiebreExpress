const express = require('express');
const path = require('path');
const mainController = require('../controller/mainController.js')
const route = express.Router();

route.get('/register', mainController.register)

module.exports = route  