const path = require('path');
const fs = require('fs')

// const datos = require('../dataBase/products.json')
// const productsFilePath = path.resolve(__dirname, '../data/products.json');
// const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController ={
     list: (req, res) =>{
          res.render(path.resolve(__dirname, '../views/products'))
          // const productRoute = path.resolve(__dirname, '../views/products');
          // res.render(productRoute, {productos});
     },
     details: (req, res) => {
          const { id } = req.params;
          res.send(`El producto id: ${id}`)
          // res.redirect(path.resolve(__dirname, '../views/products'))
     }
}

module.exports = productsController;