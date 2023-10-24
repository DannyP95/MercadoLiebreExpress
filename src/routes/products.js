const express = require('express');
const path = require('path');
const route = express.Router();

const productsController = require('../controller/productsController.js')

route.get('/', productsController.list);
route.get('/:id', productsController.details)


module.exports = route  