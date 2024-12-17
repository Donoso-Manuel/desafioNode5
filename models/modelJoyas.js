const format = require('pg-format');
const {pool} = require('../config/conexion');

const obtenerJoyasBD = async (campo, direccion, limit , offset)=>{
    try {
        const consulta = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limit, offset);
        const {rows} = await pool.query(consulta);
        return rows;
    } catch (error) {
        return  error.message;
    }
}

const obtenerJoyasFiltroDB = async (filtros)=>{
    let consulta = 'SELECT * FROM inventario';
    if(filtros.length > 0){
        filtros = filtros.join(' AND ');
        consulta += ` WHERE ${filtros}`;
    }
    try {
        const {rows} = await pool.query(consulta);
        return rows
    } catch (error) {
        return error.message;
    }
}

module.exports = {obtenerJoyasBD, obtenerJoyasFiltroDB}