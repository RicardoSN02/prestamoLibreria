const jwt = require('jsonwebtoken');
const conexion = require('../../accesobd/conexion/conexion.js');
const reservadao = require('../../accesobd/daos/reservaDAO.js')
const reserva = require('../../accesobd/objetos/reserva.js')
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

exports.getAllReservas = async (req,res) => {
    try{

        await abrirConexion();
        const reservasdao = new reservadao(nuevaConexcion);

        let reservas = await  reservasdao.consultarReservas();
        
        await cerrarConexion();
        
        res.json(reservas);
    }catch(err){
        res.status(500).json({ error: "Error al consultar prestamos"});
    }
};

exports.addReservas = async (req,res,next) => {
    try{

        camposPermitidos = ['fechaespera', 'libro', 'socio'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const nuevaReserva = new reserva(0,new Date(req.body.fechaespera),req.body.libro,req.body.socio);

        await abrirConexion();
        const reservasdao = new reservadao(nuevaConexcion);
        await reservasdao.registrarReserva(nuevaReserva);
        await cerrarConexion();

        res.json(nuevaReserva);
    } catch (err){
        next(err);
        //res.status(500).json({ error: "Hubo un problema al agregar el prestamo"});
    }
}

exports.getReservaById = async (req,res,next) =>{
    try {

        const reservaID = parseInt(req.params.id);
    
        if(isNaN(reservaID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
           //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const reservasdao = new reservadao(nuevaConexcion);
        const reserva = await reservasdao.consultarReserva(reservaID);
        await cerrarConexion();
        
        if(reserva.length <= 0){
            const error = new Error('Reserva no encontrada');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Prestamo no encontrado"});
        }

        res.json(reserva);
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el prestamo"});
    }
}

exports.deleteReserva = async (req,res,next) =>{
    try {
        const reservaId = parseInt(req.params.id);

        if(isNaN(reservaId)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        abrirConexion();
        const reservasdao = new reservadao(nuevaConexcion);
        const reserva = await reservasdao.consultarReserva(reservaId);      

        if(reserva.length <= 0){
            const error = new Error('Reserva no encontrada');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Libro no encontrado"});
        }

        await reservasdao.eliminarReserva(reservaId);

        cerrarConexion();

        res.json("Reserva eliminada");
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}