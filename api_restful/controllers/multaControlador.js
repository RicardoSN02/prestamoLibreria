const jwt = require('jsonwebtoken');
const conexion = require('../../accesobd/conexion/conexion.js');
const multadao = require('../../accesobd/daos/multaDAO.js')
const multa = require('../../accesobd/objetos/multa.js');
const libro = require('../../accesobd/objetos/libro.js');
const { error } = require('console');
const nuevaConexcion = new conexion();

function validarCampos(camposPermitidos, recibidas){
    let devolver = Object.keys(recibidas).find(key => !camposPermitidos.includes(key));
    return devolver;
}

async function abrirConexion(){
    await nuevaConexcion.abrirConexion();
}

async function cerrarConexion(){
    await nuevaConexcion.cerrarConexion();
}

const secretKey = process.env.SECRET_KEY;

exports.getAllMultas = async (req, res) => {
    try{
        await abrirConexion();
        const multasdao = new multadao(nuevaConexcion);
        let multas = await multasdao.consultarMultas();

        await cerrarConexion();
        res.json(multas);
    }catch(err){
        res.status(500).json({error: "Error al consiltar las multas"});
    }
}

exports.addMulta = async (req, res, next) => {
    try{
        camposPermitidos = ['cantidad', 'fechamulta', 'idprestamo'];
        if (validarCampos(camposPermitidos, req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400;
            throw error;
        }

        const nuevaMulta = new multa(0, req.body.cantidad, new Date (req.body.fechamulta), req.body.idprestamo);
        abrirConexion();

        const multasdao = new multadao(nuevaConexcion);
        await multasdao.registrarMulta( nuevaMulta);
        cerrarConexion();

        res.json(nuevaMulta);
    }catch(err){
        next(err);
    }
}

exports.getMultaById = async (req, res, next) => {
    try{
        const multaId = parseInt(req.params.id);
        if(isNaN(multaId)){
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const multasdao = new multadao(nuevaConexcion);
        const multa = await multasdao.consultarMulta(multaId);
        cerrarConexion();

        if(multa.length <= 0){
            const error = new Error('Multa no encontrada');
            error.statusCode = 404;
            throw error;
        }

        res.json(multa);
    }catch(err){
        next(err);
    }
}

exports.updateMulta = async (req, res, next) => {
    try{
        camposPermitidos = ['cantidad', 'fechamulta', 'idprestamo'];
        if(validarCampos(camposPermitidos, req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400;
            throw error;
        }

        const multaId = parseInt(req.params.id);

        if(isNaN(multaId)){
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const multasdao = new multadao(nuevaConexcion);
        const multas = await multasdao.consultarMulta(multaId);

        if(multas.length <= 0){
            const error = new Error ('Multa no encontrada');
            error.statusCode = 404;
            throw error;
        }
        
        if(req.body.cantidad){
            multas[0].cantidad = req.body.cantidad;
        }

        if(req.body.fechamulta){
            multas[0].fechamulta = new Date(req.body.fechamulta);
        }

        if(req.body.idprestamo){
            multas[0].idprestamo = req.body.idprestamo;
        }

        let multaActualizar = new multa(multas[0].idmulta, multas[0].cantidad, multas[0].fechamulta, multas[0].idprestamo);
        await multasdao.actualizarMulta(multaActualizar);

        cerrarConexion();

        res.json(multaActualizar);
    }catch (err){
        next(err);
    }
}

exports.deleteCantidad = async(req, res, next) => {
    try{
        const multaId = parseInt (req.params.id);
        if(isNaN(multaId)){
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const multasdao = new multadao(nuevaConexcion);
        const multa = await multasdao.consultarMulta(multaId);

        if(multa.length <= 0){
            const mutasdao = new Error('Multa no encontrada');
            error.statusCode = 404;
            throw error;
        }

        await multasdao.eliminarMulta(multaId);
        cerrarConexion();

        res.json('Libro eliminado');
    }catch(err){
        next(err);
    }

    
}