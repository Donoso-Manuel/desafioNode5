const models = require('../models/modelJoyas')


function joyasFormateadas(joyas){
    let stockTotal = 0; 
    const result = joyas.map((j)=>{
        stockTotal = stockTotal + j.stock;
        return{
            name: j.nombre,
            href: `/joyas/joya/${j.id}`
        }
    });
    const totalJoyas = joyas.length;
    const HATEOAS = {
        totalJoyas,
        stockTotal,
        result
    }
    return HATEOAS;
}

const obtenerJoyas = async (req, res)=>{
    const {limit = 10, order_by = 'id_ASC', page = 1} = req.query;
 
    if (isNaN(limit) || limit <= 0) {
        return res.status(400).send("El parámetro 'limit' debe ser un número");
    }else if(!Number.isInteger(limit)){
        return res.status(400).send('El parametro "Limit" debe ser un numero entero')
    }
    if (isNaN(page) || page <= 0) {
        return res.status(400).send("El parámetro 'page' debe ser un número positivo");
    }else if(!Number.isInteger(page)){
        return res.status(400).send('El parametro "page" debe ser un numero entero')
    }


    const [campo, direccion] = order_by.split('_');
    
    if (direccion !== 'ASC' && direccion !== 'DESC') {
        return res.status(400).send("El parámetro 'order_by' debe tener un campo válido seguido de 'campoElegido_ASC' o 'campoElegido_DESC'.");
    }

    const offset = (page -1) * limit;
    try {
        const joyas = await models.obtenerJoyasBD(campo, direccion, limit, offset);
        const joyasHATEOAS = joyasFormateadas(joyas)
        res.status(200).json(joyasHATEOAS);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const obtenerJoyasFiltro = async (req, res)=>{
    let filtros = [];
    const {precio_max, precio_min, categoria, metal} = req.query;
    if(precio_max) filtros.push(`precio <= ${precio_max}`);
    if(precio_min) filtros.push(`precio >= ${precio_min}`);
    if(categoria) filtros.push(`categoria = '${categoria}'`);
    if(metal) filtros.push(`metal = '${metal}'`);
    try {
        const joyasFiltradas = await models.obtenerJoyasFiltroDB(filtros)
        res.status(200).json(joyasFiltradas);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {obtenerJoyas, obtenerJoyasFiltro};