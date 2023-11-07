const path = require('path');
const fs = require('fs');

const usersFilePath = path.resolve(__dirname, '../dataBase/users.json');
const usersLogin = fs.readFileSync(usersFilePath, 'utf-8');
const usersLoginJSON = JSON.parse(usersLogin);
const usuariosLogueados = usersLoginJSON.usuariosTotales;

function cookieLoginMiddleware(req, res, next) {
    // SI NO LE AGREGAMOS next(), NUNCA ENTRA EN EL BUCLE
    next();
    // ACA PREGUNTAMOS SI HAY ALGO EN COOKIES Y SI NO HAY NADA EN SESSION, PARA QUE GUARDE LOS DATOS EN SESSION 
    if(req.cookies.checkboxLogin != undefined && req.session.usersLogged == undefined){
        // AQUÍ VA EL CONCICIONAL
        
        for (let i = 0; i < usuariosLogueados.length; i++) {
            if (usuariosLogueados[i].userMail == req.cookies.checkboxLogin) {
                usersLogged = usuariosLogueados[i];
                break;
            }
        }
        req.session.usersLogged = usersLogged;
    }
}

module.exports = cookieLoginMiddleware;