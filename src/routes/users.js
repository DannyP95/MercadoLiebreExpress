const express = require('express');
const path = require('path');
const usersController = require('../controller/usersController.js')
const guestMiddleware = require('../middlewares/guestMiddleware.js')
const route = express.Router();
const { body } = require('express-validator');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        imgLocation = './public/images/users';
        cb(null, imgLocation);
    },
    filename: function (req, file, cb) {
        const newFileName = 'img-user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({storage})


const userCreateValidation = [
    body('userName').notEmpty().withMessage('Tiene que escribir un nombre de usuario').bail(),
    body('userMail').isEmail().withMessage('Tiene que ser un mail válido'),
    body('userPassword').isLength({min: 6}).withMessage('Tiene que tener mínimo 6 caracteres'),
];

const userLoginValidation = [
    body('userMail').isEmail().withMessage('Mail inválido').bail(),
    body('userPassword').isLength({min: 6}).withMessage('Tiene que tener mínimo 6 caracteres'),
];

route.get('/login', usersController.login)

route.post('/profile', upload.single('imgUser'), userLoginValidation, usersController.processLogin)

route.get('/register', guestMiddleware, usersController.registerViews)

route.post('/register', upload.single('imgUser'), userCreateValidation, usersController.register)

route.get('/profile', usersController.profile)



module.exports = route  