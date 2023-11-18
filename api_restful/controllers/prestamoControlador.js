const jwt = require('jsonwebtoken');
const conexion = require('../../accesobd/conexion/conexion.js');
const prestamodao = require('../../accesobd/daos/prestamoDAO.js')
const prestamo = require('../../accesobd/objetos/prestamo.js')
const nuevaConexcion = new conexion();

function validarCampos(camposPermitidos,recibidas){
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

exports.getAllPrestamos = async (req,res) => {
    try{

        await abrirConexion();
        const prestamosdao = new prestamodao(nuevaConexcion);

        let prestamos = await  prestamosdao.consultarPrestamos();
        
        await cerrarConexion();
        
        res.json(prestamos);
    }catch(err){
        res.status(500).json({ error: "Error al consultar prestamos"});
    }
};

exports.addPrestamo = async (req,res,next) => {
    try{

        camposPermitidos = ['fechainicio', 'fechafin', 'estado', 'libro', 'socio'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const nuevoPrestamo = new prestamo(0,new Date(req.body.fechainicio),new Date(req.body.fechafin),req.body.estado,req.body.libro,req.body.socio);

        await abrirConexion();
        const prestamosdao = new prestamodao(nuevaConexcion);
        await prestamosdao.registrarPrestamo(nuevoPrestamo);
        await cerrarConexion();

        res.json(nuevoPrestamo);
    } catch (err){
        next(err);
        //res.status(500).json({ error: "Hubo un problema al agregar el prestamo"});
    }
}

exports.getPrestamoById = async (req,res,next) =>{
    try {

        const prestamoID = parseInt(req.params.id);
    
        if(isNaN(prestamoID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
           //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const prestamosdao = new prestamodao(nuevaConexcion);
        const prestamo = await prestamosdao.consultarPrestamo(prestamoID);
        await cerrarConexion();
        
        if(prestamo.length <= 0){
            const error = new Error('Prestamo no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Prestamo no encontrado"});
        }

        res.json(prestamo);
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el prestamo"});
    }
}

exports.updatePrestamo = async (req,res,next) =>{
    try {
        camposPermitidos = ['fechainicio', 'fechafin', 'estado', 'libro', 'socio'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const prestamoID = parseInt(req.params.id);
    
        if(isNaN(prestamoID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const prestamosdao = new prestamodao(nuevaConexcion);
        const prestamos = await prestamosdao.consultarPrestamo(prestamoID);
        
        if(prestamos.length <= 0){
            const error = new Error('Prestamo no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Socio no encontrado"});
        }

        if(req.body.fechainicio){
            prestamos[0].fechainicio = new Date(req.body.fechainicio);
        }

        if(req.body.fechafin){
            prestamos[0].fechafin = new Date(req.body.fechafin);
        }

        if(req.body.estado){
            prestamos[0].estado = req.body.estado;
        }

        if(req.body.libro){
            prestamos[0].libro = req.body.libro;
        }

        if(req.body.socio){
            prestamos[0].socio = req.body.socio;
        }


        let prestamoActualizar = new prestamo(prestamos[0].idprestamo,prestamos[0].fechainicio,prestamos[0].fechafin,prestamos[0].estado,prestamos[0].libro,prestamos[0].socio)

        await prestamosdao.renovarPrestamo(prestamoActualizar)

        await cerrarConexion();   

        res.json(prestamoActualizar);
    } catch (err) {
        next(err);
    }
}

