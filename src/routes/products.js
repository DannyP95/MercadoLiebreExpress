const express = require('express');
const path = require('path');
const route = express.Router();
const { body } = require('express-validator');
const multer = require('multer')

//Validacion del formulario

const createProdValidation = [
    body('name').notEmpty().withMessage('Campo obligatorio').bail(),
    body('brand').notEmpty().withMessage('Campo obligatorio').bail(),
    body('model').notEmpty().withMessage('Campo obligatorio').bail(),
    body('category').notEmpty().withMessage('Campo obligatorio').bail(),
    body('price').isInt().withMessage('Campo obligatorio').bail()
];

// REQUERIMOS MIDDLEWARE
const logDBMiddleware = require('../middlewares/logDBMiddleware')

const productsController = require('../controller/productsController.js');
// const { ExpressValidator } = require('express-validator');
const { name } = require('ejs');
// const upload = require('../controller/productsController.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        imgLocation = './public/images';
        cb(null, imgLocation);
    },
    filename: function (req, file, cb) {
        const newFileName = 'img-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({storage})
// Creamos una constante que utilice a multer y lo guardado dentro de está y poder utilizar sus datos 
// storage es un objeto literal 

// localhost:3001/products/
route.get('/', productsController.products);
route.get('/create', productsController.createViews);
route.post('/createProd', upload.single('image'), createProdValidation, logDBMiddleware, productsController.createProd);
// El upload.single('image') se utiliza para subir la imagen (1 sola) y entre parentesis va el name de la imagen


route.get('/:id', productsController.detallesProd);

module.exports = route;