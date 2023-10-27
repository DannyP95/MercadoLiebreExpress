const path = require('path');
const fs = require('fs')

const datos = require('../dataBase/products.json');
const { log } = require('console');
const productsFilePath = path.resolve(__dirname, '../dataBase/products.json');
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
     },

     createViews: (req, res) => {
          res.render(path.resolve(__dirname, '../views/createProd'));
     },

     createProd: (req, res) => {
          const leerData = fs.readFileSync(productsFilePath, 'utf-8');
          const data = JSON.parse(leerData);

          const maxId = Math.max(...data.productosTotales.map(product => product.id));

          console.log(maxId)

          console.log(req.body.name)


          if (req.body && req.body.name) {
               // El objeto req.body y la propiedad 'name' están definidos, entonces puedes acceder a req.body.name
               const newProduct = {
                   id: maxId + 1,
                   name: req.body.name,
                   brand: req.body.brand,
                   model: req.body.model,
                   category: req.body.category,
                   price: req.body.price,
                   image: req.body.image
               };
               
               
               
               data.productosTotales.push(newProduct);
               
               fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');

               console.log(newProduct)
               
               console.log(newProduct)

               res.render('../views/createProd');
               
          }else{
               console.log('No se encontro name')
          }
          }
     }
     
module.exports = productsController;