// CHECKEA SI EL USUARIO NO ESTÁ LOGUEADO
function guestMiddleware(req, res, next) {
    if (req.session.usersLogged == undefined){
        next();
    }else{
        res.send('Usted ya está logueado, no puede acceder a está página')
    }
}

module.exports = guestMiddleware;