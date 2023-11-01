const path = require('path');
const fs = require('fs')
const multer = require('multer');

const datos = require('../dataBase/products.json');
const { log } = require('console');
const productsFilePath = path.resolve(__dirname, '../dataBase/products.json');
const { productosTotales } = datos
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



// CONTROLADOR 

const productsController ={
     products: (req, res) =>{
          // const { productosTotales } = datos
          res.render('products', {data: productosTotales})
     },
     detallesProd: (req, res) => {
          // const { productosTotales } = datos
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
          //Número Random Descuento
          const randomNumber = Math.floor(Math.random() * 9);
          const result = randomNumber * 5;
          //result = N° Random de descuento 

          //Traer el ultimo id
          const maxId = Math.max(...data.productosTotales.map(product => product.id));
          // 

          // Modificamos los campos de un nuevo producto
          if (req.body && req.body.name) {
               // El objeto req.body y la propiedad 'name' están definidos, entonces puedes acceder a req.body.name
               const newFileName = req.file.filename
               // en la const newFileName guardamos el nombre de la imagen creada
               //en esta constante le guardamos los nuevos campos al nuevo producto
               const newProduct = {
                   id: maxId + 1,
                   name: req.body.name,
                   brand: req.body.brand,
                   model: req.body.model,
                   category: req.body.category,
                   price: req.body.price,
                   discount: result,
                   image: req.body.image,
               //  Esta "image" lo utilizamos para las imagenes del proyecto ML 
                   image: newFileName
               //  Este último "image" lo utilizamos para las imagenes subidas desde el sevidor
               };
               
               
               //Insertamos el nuevo producto a la base de datos
               data.productosTotales.push(newProduct);
               
               fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');

               // res.redirect('/')
               res.render('products', { data: data.productosTotales });

               
          }else{
               console.log('No se encontro name')
          }
            
     }
     
     }
     
module.exports = productsController;