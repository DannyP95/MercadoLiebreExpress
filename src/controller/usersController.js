const fs = require('fs');
const path = require('path');
const datos = require('../dataBase/users.json')
const usersFilePath = path.resolve(__dirname, '../dataBase/users.json');
const { usuariosTotales } = datos
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator')


const usersController ={
     profile: (req, res) =>{
        res.render('profile', {data: usuariosTotales})

     },

     login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login'))
     },

     registerViews: (req, res) =>{
        res.render(path.resolve(__dirname, '../views/register'))
     },
     
     register: (req, res) => {
        // Variable donde guardamos los errores de validación          
        let errorsValidation = validationResult(req); 
        
        // Preguntamos si no hay ningún error, realizamos la creación sin problemas
        if(errorsValidation.isEmpty()){

             
             // Aca pasamos data de string a JSON
             const data = usersJSON;
                          
             //Traer el ultimo id
             const maxId = Math.max(...data.usuariosTotales.map(users => users.id));
             // 
             
             // Modificamos los campos de un nuevo producto
             if (req.body && req.body.userName) {
                  // El objeto req.body y la propiedad 'name' están definidos, entonces puedes acceder a req.body.name
                  const newFileName = req.file ? req.file.filename : '';
                  // en la const newFileName guardamos el nombre de la imagen creada
                  //en esta constante le guardamos los nuevos campos al nuevo producto
                  
                  const newUsers = {
                        id: maxId + 1,
                        userName: req.body.name,
                        password: req.body.password,
                        userMail: req.body.userMail,
                        //  Esta "image" lo utilizamos para las imagenes del proyecto ML 
                        image:newFileName
                        //  Este último "image" lo utilizamos para las imagenes subidas desde el sevidor
                    };
             
             
             //Insertamos el nuevo usuario a la base de datos
             data.usuariosTotales.push(newUsers);
             
             fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
             
             // res.redirect('/')
             res.render('profile', { data: usuariosTotales });
             
             
        }else{
             console.log('No se encontro name')
        }
        
   }else{
        res.render('../views/register', {errorsValidation: errorsValidation.array(), oldData: req.body});
   }
   }

   }

module.exports = usersController