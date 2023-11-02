const path = require('path');
const fs = require('fs')
const multer = require('multer');

const datos = require('../dataBase/products.json');
const { log, error } = require('console');
const productsFilePath = path.resolve(__dirname, '../dataBase/products.json');
const { productosTotales } = datos
const productosJSON = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { validationResult } = require('express-validator')


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
          // Variable donde guardamos los errores de validación          
          let errorsValidation = validationResult(req); 
          
          // Preguntamos si no hay ningún error, realizamos la creación sin problemas
          if(errorsValidation.isEmpty()){

               
               // Aca pasamos data de string a JSON
               const data = productosJSON;
               
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
                    const newFileName = req.file ? req.file.filename : '';
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
                    image:newFileName
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
          
     }else{
          res.render('../views/createProd', {errorsValidation: errorsValidation.array(), oldData: req.body});
     }
     }
     
     }
     
module.exports = productsController;