const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs')


const datos = require('../dataBase/users.json')
const { usuariosTotales } = datos
const usersFilePath = path.resolve(__dirname, '../dataBase/users.json');
const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');
const session = require('express-session');
const { log } = require('console');
const { json } = require('express');


const usersController ={
     profile: (req, res) =>{
        res.render('profile', {data: usuariosTotales})

     },

     login: (req, res) => {
          if(req.session.usersLogued){
              res.render('profile', {data: usuariosTotales})
          }else{
          res.render('login')
          }
     },

     processLogin: (req, res) => {
          
          let errorsValidation = validationResult(req); 
          const usersLogin = fs.readFileSync(usersFilePath, 'utf-8');
          const usersLoginJSON = JSON.parse(usersLogin);
          const usuariosLogueados = usersLoginJSON.usuariosTotales

let usersLogged;
// const JSON = usersJSON;

if (errorsValidation.isEmpty()) {
    for (let i = 0; i < usuariosLogueados.length; i++) {
        

        if (usuariosLogueados[i].userMail == req.body.userMail) {
          console.log('Usuario encontrado: '+ usuariosLogueados[i].userName);
          console.log('Con el Mail: '+ usuariosLogueados[i].userMail);
            if (bcryptjs.compareSync(req.body.userPassword, usuariosLogueados[i].userPassword)) {
                usersLogged = usuariosLogueados[i];
                break;
               }else{
            }
          console.log('Contraseña Incorrecta');
        }
    }

               console.log('usuario: ' + usersLogged);

               if(usersLogged == undefined){

                    res.render('login', {errorsValidation: errorsValidation.array(), oldData: req.body})
               }else{

               req.session.usersLogged = usersLogged;
               
               // GUARDAR SESSION 
               if (req.body.checkboxLogin != undefined){
                    res.cookie('checkboxLogin', usersLogged.userMail, { maxAge: 60000 * 60 * 24});
               }

               // res.render('profile', {data: usuariosTotales})
               res.send('ok')
               }


          }else{
               //Si hay errores, viene aca.
               res.render('login', {errorsValidation : errorsValidation.array(), oldData: req.body});
          }
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
                        userName: req.body.userName,
                        userMail: req.body.userMail,
                        userPassword: bcryptjs.hashSync(req.body.userPassword, 10),
                        //  Esta "image" lo utilizamos para las imagenes del proyecto ML 
                        imgUser:newFileName
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