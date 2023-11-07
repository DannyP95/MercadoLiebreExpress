// CHECKEA SI EL USUARIO SI ESTÁ LOGUEADO

function authMiddleware(req, res, next) {
    if (req.session.usersLogged != undefined){
        next();
    }else{
        res.send('Esta página es solo para usuarios')
    }
}

module.exports = authMiddleware;