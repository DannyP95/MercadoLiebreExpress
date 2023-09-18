const path = require('path');

const mainController ={
     home: (req, res) =>{
          res.render(path.resolve(__dirname, '../views/home'))
     },
     login: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/login'))
     },
     register: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/register'))
     }
}

module.exports = mainController
