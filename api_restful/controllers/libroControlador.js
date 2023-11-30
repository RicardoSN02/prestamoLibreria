const jwt = require('jsonwebtoken');
const fs = require('fs');
const conexion = require('../../accesobd/conexion/conexion.js');
const librodao = require('../../accesobd/daos/librosDAO.js')
const libro = require('../../accesobd/objetos/libro.js')
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

exports.getAllLibros = async (req,res) => {
    try{

        await abrirConexion();
        const librosdao = new librodao(nuevaConexcion);

        let libros = await  librosdao.consultarLibros();

        const librosConImagenBase64 = await Promise.all(libros.map(async libro => {
            if (libro.imagen) {
                const imagePath = `public/${libro.imagen}`;
                const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
                return {
                    ...libro,
                    imagen: `${imageData}`,
                };
            } else {
                return libro;
            }
        }));

        await cerrarConexion();

        res.json(librosConImagenBase64);
    }catch(err){
        res.status(500).json({ error: "Error al consultar libros"});
    }
};

exports.addLibro = async (req,res,next) => {
    try{

        camposPermitidos = ['titulo', 'editorial', 'fechaPublicacion', 'categoria', 'autor','resumen','imagen'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const imagenPath = req.file ? 'uploads/' + req.file.filename : null;

        const nuevoLibro = new libro(0,req.body.titulo,req.body.editorial,new Date(req.body.fechaPublicacion),req.body.categoria,req.body.autor,req.body.resumen,imagenPath);

        abrirConexion();
        const librosdao = new librodao(nuevaConexcion);
        await librosdao.insertarLibro(nuevoLibro);
        cerrarConexion();

        res.json(nuevoLibro);
    } catch (err){
        next(err);
        //res.status(500).json({ error: "Hubo un problema al agregar el libro"});
    }
}

exports.getLibroById = async (req,res,next) =>{
    try {

        const libroId = parseInt(req.params.id);
    
        if(isNaN(libroId)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
           //return res.status(400).json({error: "ID invalido"});
        }

        abrirConexion();
        const librosdao = new librodao(nuevaConexcion);
        const libro = await librosdao.consultarLibro(libroId);

        
        const librosConImagenBase64 = await Promise.all(libro.map(async libro => {
            if (libro.imagen) {
                const imagePath = `public/${libro.imagen}`;
                const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
                return {
                    ...libro,
                    imagen: `${imageData}`,
                };
            } else {
                return libro;
            }
        }));

        /** 
        const librosConImagenUrl = libro.map(libro => ({
            ...libro,
            imagen: libro.imagen ? `http://localhost:8082/public/${libro.imagen}` : null,
        }));
        */
        cerrarConexion();
        
        if(libro.length <= 0){
            const error = new Error('Libro no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Libro no encontrado"});
        }

        res.json(librosConImagenBase64);
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}

exports.updateLibro = async (req,res,next) =>{
    try {
        camposPermitidos = ['titulo', 'editorial', 'fechaPublicacion', 'categoria', 'autor','resumen','imagen'];
        if(validarCampos(camposPermitidos,req.body)){
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
        }

        const libroId = parseInt(req.params.id);
    
        if(isNaN(libroId)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        abrirConexion();
        const librosdao = new librodao(nuevaConexcion);
        const libros = await librosdao.consultarLibro(libroId);
        
        if(libros.length <= 0){
            const error = new Error('Libro no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Libro no encontrado"});
        }

        const imagenPath = req.file ? 'uploads/' + req.file.filename : null;

        if(req.body.titulo){
            libros[0].titulo = req.body.titulo;
        }

        if(req.body.editorial){
            libros[0].editorial = req.body.editorial;
        }

        if(req.body.fechaPublicacion){
            libros[0].fechaPublicacion = new Date(req.body.fechaPublicacion);
        }

        if(req.body.categoria){
            libros[0].categoria = req.body.categoria;
        }

        if(req.body.autor){
            libros[0].autor = req.body.autor;
        }

        if(req.body.resumen){
            libros[0].resumen = req.body.resumen;
        }

        if(req.file.filename){
            libros[0].imagen = imagenPath;
        }


        let libroActualizar = new libro(libros[0].idlibro,libros[0].titulo,libros[0].editorial,libros[0].fechaPublicacion,libros[0].categoria,libros[0].autor,libros[0].resumen,libros[0].imagen)

        await librosdao.actualizarLibro(libroActualizar)

        cerrarConexion();   

        res.json(libroActualizar);
    } catch (err) {
        next(err);
    }
}

exports.deleteLibro = async (req,res,next) =>{
    try {
        console.log(req.params.id)
        const libroId = parseInt(req.params.id);

        
        if(isNaN(libroId)){
            const error = new Error('ID invalido');
            error.statusCode = 400; // Establecer el código de estado
            throw error;
            //return res.status(400).json({error: "ID invalido"});
        }

        abrirConexion();
        const librosdao = new librodao(nuevaConexcion);
        const libro = await librosdao.consultarLibro(libroId);        

        if(libro.length <= 0){
            const error = new Error('Libro no encontrado');
            error.statusCode = 404; // Establecer el código de estado
            throw error;
            //return res.status(404).json({error: "Libro no encontrado"});
        }

        await librosdao.eliminarLibro(libroId);

        cerrarConexion();

        res.json("libro eliminado");
    } catch (err) {
        next(err);
        //res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}
