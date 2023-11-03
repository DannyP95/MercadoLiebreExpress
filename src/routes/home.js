const express = require('express');
const path = require('path');
const route = express.Router();

const mainController = require('../controller/mainController.js')

route.get('/', mainController.home)




module.exports = route  
