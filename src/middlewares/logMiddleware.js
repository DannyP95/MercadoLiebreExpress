const fs = require('fs');

// function logMiddleware(req, res, next){
//     // fs.writeFileSync('log.txt', 'Se ingreso en la página: ' + req.url);
//     // Creamos/escribimos en un archivo (1er parametro) y le pasamos un texto (2do parametro)

//     fs.appendFileSync('log.txt', 'Se ingreso en la página: ' + req.url + '\n' );
//     // Creamos/escribimos en un archivo (1er parametro) y le pasamos un texto (2do parametro) En forma de cadenas


    function isHtmlRequest(req) {
        // Verificar si la solicitud es para un recurso HTML
        return req.headers['accept'].includes('text/html');
    }
    
    function logMiddleware(req, res, next) {
        if (isHtmlRequest(req)) {
            // Solo registra solicitudes para recursos HTML
            fs.appendFileSync('log.txt', 'Se ingresó en la página: ' + req.url + '\n');
        }

    next();
    // Le decimos que vaya al siguiente middleware

    
}

module.exports = logMiddleware