const fs = require('fs');
const path = require('path');

const reporteMiddleware = (req, res, next)=>{
    const {method, originalUrl} = req;
    const fecha = new Date().toISOString();

    const mensaje = `Fecha: ${fecha} - Metodo: ${method} - Ruta: ${originalUrl}\n`;

    const logFilePath = path.join(__dirname, 'logs.txt');

    fs.appendFileSync(logFilePath, mensaje, 'utf8');
    next();
}

module.exports = reporteMiddleware;