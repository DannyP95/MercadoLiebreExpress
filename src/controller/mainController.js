const path = require('path');
const datos = require('../dataBase/products.json')


const mainController ={
     home: (req, res) =>{
         //  res.render(path.resolve(__dirname, '../views/home'))
        //  console.log(datos);
        const { productosTotales } = datos
        res.render('home', {data: productosTotales})
     },

     login: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/login'))
     },
     
     register: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/register'))
     },

   }

module.exports = mainController
