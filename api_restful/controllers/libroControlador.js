const fs = require('fs');
const Libro = require('../../accesobd/objetos/libro.js');
const dataPath = './data/libros.json';

exports.getAllLibros = (req,res) => {
    try{
        const data = JSON.parse(fs.readFileSync(dataPath));
        res.json(data);
    }catch(err){
        res.status(500).json({ error: "Error al consultar libros"});
    }
};

exports.addLibro = (req,res) => {
    try{
        const data = JSON.parse(fs.readFileSync(dataPath));
        const nuevoLibro = new Libro(0,req.body.titulo,req.body.editorial,Date.now(),req.body.categoria,req.body.autor);
        data.push(nuevoLibro);
        fs.writeFileSync(dataPath, JSON.stringify(data,null,2))

        res.json(nuevoLibro);
    } catch (err){
        res.status(500).json({ error: "Hubo un problema al agregar el libro"});
    }
}

exports.getLibroById = (req,res) =>{
    const libroId = parseInt(req.params.id);
    
    if(isNaN(libroId)){
        return res.status(400).json({error: "ID invalido"});
    }

    try {
        const data = JSON.parse(fs.readFileSync(dataPath));
        const libro = data.find((a) => a.id === libroId);

        if(!libro){
            return res.status(404).json({error: "Libro no encontrado"});
        }

        res.json(libro);
    } catch (err) {
        res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}

exports.updateLibro = (req,res) =>{
    const libroId = parseInt(req.params.id);
    
    if(isNaN(libroId)){
        return res.status(400).json({error: "ID invalido"});
    }

    try {
        const data = JSON.parse(fs.readFileSync(dataPath));
        const index = data.findIndex((a) => a.id === libroId);
        //const libro = data.find((a) => a.id === libroId);

        if(index === -1){
            return res.status(404).json({error: "Libro no encontrado"});
        }

        const libroActualizar = data[index];
        if(req.body.titulo){
            libroActualizar.titulo = req.body.titulo;
        }

        if(req.body.editorial){
            libroActualizar.editorial = req.body.editorial;
        }

        if(req.body.fechaPublicacion){
            libroActualizar.fechaPublicacion = req.body.fechaPublicacion;
        }

        if(req.body.categoria){
            libroActualizar.categoria = req.body.categoria;
        }

        if(req.body.autor){
            libroActualizar.autor = req.body.autor;
        }

        fs.writeFileSync(dataPath,JSON.stringify(data,null,2));

        res.json(libroActualizar);
    } catch (err) {
        res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}

exports.deleteLibro = (req,res) =>{
    const libroId = parseInt(req.params.id);
    
    if(isNaN(libroId)){
        return res.status(400).json({error: "ID invalido"});
    }

    try {
        const data = JSON.parse(fs.readFileSync(dataPath));
        const index = data.findIndex((a) => a.id === libroId);

        if(index === -1){
            return res.status(404).json({error: "Libro no encontrado"});
        }

        data.splice(index,1);
        fs.writeFileSync(dataPath, JSON.stringify(data,null,2));
        res.json("libro eliminado");
    } catch (err) {
        res.status(500).json({ error: "Hubo un problema al encontrar el libro"});
    }
}
