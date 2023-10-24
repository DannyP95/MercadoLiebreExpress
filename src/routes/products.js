const express = require('express');
const path = require('path');
const route = express.Router();

const productsController = require('../controller/productsController.js')

route.get('/', productsController.products);

route.get('/:id', productsController.detallesProd)


module.exports = route  