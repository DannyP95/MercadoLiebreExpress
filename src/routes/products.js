const express = require('express');
const path = require('path');
const route = express.Router();
const multer = require('multer')


const productsController = require('../controller/productsController.js')
// const upload = require('../controller/productsController.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const newFileName = 'img-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({storage})

route.get('/', productsController.products);
route.get('/create', productsController.createViews);
route.post('/createProd', upload.single('image'), productsController.createProd);
// El upload.single('image') se utiliza para subir la imagen (1 sola) y entre parentesis va el name de la imagen


route.get('/:id', productsController.detallesProd);

module.exports = route;