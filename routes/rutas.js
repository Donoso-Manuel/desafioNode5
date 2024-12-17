const express = require('express');
const router = express.Router();
const controllerJoyas = require('../controllers/controllerJoyas.js');

router.get('/joyas', controllerJoyas.obtenerJoyas);

router.get('/joyas/filtros', controllerJoyas.obtenerJoyasFiltro);

module.exports = router;