const path = require('path');
const datos = require('../dataBase/products.json')


const mainController ={
   home: (req, res) =>{
      //  res.render(path.resolve(__dirname, '../views/home'))
      //  console.log(datos);
      const { productosTotales } = datos
      res.render('home', {data: productosTotales})
   },

   session: (req, res) => {
      if (req.session.sessionTotal === undefined){
         req.session.sessionTotal = 0;
      }
    
      req.session.sessionTotal ++
         
      res.send('Contador: ' + req.session.sessionTotal);
   },

   sessionCount: (req, res) => {
         
      res.send('Visitas Totales: ' + req.session.sessionTotal);
   },

   checked: (req, res) => {
      if(req.session.usersLogged === undefined){
         res.send('No estás Logueado')
      }else{
         res.send('usuario logueado es: ' + req.session.usersLogged.userName)
      }
   }
      

   }

module.exports = mainController
