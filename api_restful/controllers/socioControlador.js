const jwt = require('jsonwebtoken');
const conexion = require('../../accesobd/conexion/conexion.js');
const sociodao = require('../../accesobd/daos/sociosDAO.js')
const socio = require('../../accesobd/objetos/socio.js')
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

exports.getAllSocios = async (req,res) => {
    try{

        await abrirConexion();
        const sociosdao = new sociodao(nuevaConexcion);

        let socios = await  sociosdao.consultarSocios();
        
        await cerrarConexion();
        
        res.json(socios);
    }catch(err){
        res.status(500).json({ error: "Error al consultar socios"});
    }
};

exports.addSocio = async (req,res,next) => {
    try{

        camposPermitidos = ['nombre', 'email', 'password', 'telefono', 'tipo'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const nuevoSocio = new socio(0,req.body.nombre,req.body.email,req.body.password,req.body.telefono,req.body.tipo);

        await abrirConexion();
        const sociosdao = new sociodao(nuevaConexcion);
        await sociosdao.insertarSocio(nuevoSocio);
        await cerrarConexion();

        res.json(nuevoSocio);
    } catch (err){
        next(err);
        //res.status(500).json({ error: "Hubo un problema al agregar el libro"});
    }
}

exports.getSocioById = async (req,res,next) =>{
    try {

        const socioID = parseInt(req.params.id);
    
        if(isNaN(socioID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
           //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const sociosdao = new sociodao(nuevaConexcion);
        const socio = await sociosdao.consultarSocio(socioID);
        await cerrarConexion();
        
        if(socio.length <= 0){
            const error = new Error('Socio no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Socio no encontrado"});
        }

        res.json(socio);
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}

exports.updateSocio = async (req,res,next) =>{
    try {
        camposPermitidos = ['nombre', 'email', 'password', 'telefono', 'tipo'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const socioID = parseInt(req.params.id);
    
        if(isNaN(socioID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const sociosdao = new sociodao(nuevaConexcion);
        const socioRec = await sociosdao.consultarSocio(socioID);
        
        if(socioRec.length <= 0){
            const error = new Error('Socio no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Socio no encontrado"});
        }

        if(req.body.nombre){
            socioRec[0].nombre = req.body.nombre;
        }

        if(req.body.email){
            socioRec[0].email = req.body.email;
        }

        if(req.body.password){
            socioRec[0].password = req.body.password;
        }

        if(req.body.telefono){
            socioRec[0].telefono = req.body.telefono;
        }

        if(req.body.tipo){
            socioRec[0].tipo = req.body.tipo;
        }


        let socioActualizar = new socio(socioRec[0].idsocio,socioRec[0].nombre,socioRec[0].email,socioRec[0].password,socioRec[0].telefono,socioRec[0].tipo)

        await sociosdao.actualizarSocio(socioActualizar)

        await cerrarConexion();   

        res.json(socioActualizar);
    } catch (err) {
        next(err);
    }
}

exports.deleteSocio = async (req,res,next) =>{
    try {
        const socioID = parseInt(req.params.id);

        if(isNaN(socioID)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        await abrirConexion();
        const sociosdao = new sociodao(nuevaConexcion);
        const socio = await sociosdao.consultarSocio(socioID);        

        if(socio.length <= 0){
            const error = new Error('Socio no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Socio no encontrado"});
        }

        await sociosdao.eliminarSocio(socioID);

        await cerrarConexion();

        res.json("Socio eliminado");
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}