const express = require('express');
const cors = require('cors');
const joyasRoutes = require('./routes/rutas');
const reporteMiddlewares = require('./middlewares/reporte')

const app = express();

app.use(cors());
app.use(express.json());

app.use(reporteMiddlewares)

app.listen(3000, ()=>{
    console.log('Servidor Iniciado');
})

app.use('/', joyasRoutes);