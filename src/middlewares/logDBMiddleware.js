const fs = require('fs');

    function isHtmlRequest(req) {
        // Verificar si la solicitud es para un recurso HTML
        return req.headers['accept'].includes('text/html');
    }
    
    function logDBMiddleware(req, res, next) {
        if (isHtmlRequest(req)) {
            // Solo registra solicitudes para recursos HTML
            fs.appendFileSync('logDB.txt', 'Se ingresó datos en: ' + req.url + '\n');
        }

    next();
    // Le decimos que vaya al siguiente middleware

}

module.exports = logDBMiddleware