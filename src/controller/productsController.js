const path = require('path');
const fs = require('fs')

const datos = require('../dataBase/products.json');
const { log } = require('console');
// const productsFilePath = path.resolve(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController ={
     products: (req, res) =>{
          const { productosTotales } = datos
          res.render('products', {data: productosTotales})
     },
     detallesProd: (req, res) => {
          const { productosTotales } = datos
          
          const productId = parseInt(req.params.id, 10);
          const idProd = productosTotales.find(product => product.id === productId);

          res.render('detallesProd', {data: idProd });          
     }
}

module.exports = productsController;