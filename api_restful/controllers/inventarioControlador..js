const jwt = require('jsonwebtoken');
const conexion = require('../../accesobd/conexion/conexion.js');
const invetariodao = require('../../accesobd/daos/inventarioDAO.js');
const inventario = require('../../accesobd/objetos/inventario.js');
const nuevaConexcion = new conexion();

function validarCampos(camposPermitidos, recibidas) {
    let devolver = Object.keys(recibidas).find(key => !camposPermitidos.includes(key));
    return devolver;
}

async function abrirConexion() {
    await nuevaConexcion.abrirConexion();
}

async function cerrarConexion() {
    await nuevaConexcion.cerrarConexion();
}

const secretKey = process.env.SECRET_KEY;

exports.getAllInventario = async (req, res) => {
    try {
        await abrirConexion();
        const invetariosdao = new invetariodao(nuevaConexcion);
        let invetarios = await invetariosdao.consultarInventarios();
        await cerrarConexion();

        res.json(invetarios);
    } catch (err) {
        res.status(500).json({ error: "Error al consultar todo el invetario" });
    }
}

exports.addInventario = async (req, res, next) => {
    try {
        camposPermitidos = ['cantidad', 'existencia', 'idlibro'];
        if (validarCampos(camposPermitidos, req.body)) {
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400;
            throw error;
        }

        const nuevoInvetario = new inventario(0, req.body.cantidad, req.body.existencia, req.body.idlibro);
        abrirConexion();
        const invetariosdao = new invetariodao(nuevaConexcion);
        await invetariosdao.agregarInventario(nuevoInvetario);
        cerrarConexion();

        res.json(nuevoInvetario);
    } catch (err) {
        next(err);
    }
}

exports.getInventarioById = async (req, res, next) => {
    try {
        const inventarioId = parseInt(req.params.id);
        if (isNaN(inventarioId)) {
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const invetariosdao = new invetariodao(nuevaConexcion);
        const invetario = await invetariosdao.consultarInventario(inventarioId);
        cerrarConexion();

        if (invetario.length <= 0) {
            const error = new Error('Inventario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        res.json(invetario);
    } catch (err) {
        next(err);
    }
}

exports.getInventarioByLibroId = async (req, res, next) => {
    try {
        const inventarioId = parseInt(req.params.id);
        if (isNaN(inventarioId)) {
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const invetariosdao = new invetariodao(nuevaConexcion);
        const invetario = await invetariosdao.consultarInventarioLibro(inventarioId);
        cerrarConexion();

        if (invetario.length <= 0) {
            const error = new Error('Inventario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        res.json(invetario);
    } catch (err) {
        next(err);
    }
}

exports.updateInventario = async (req, res, next) => {
    try {
        camposPermitidos = ['cantidad', 'existencia', 'idlibro'];
        if (validarCampos(camposPermitidos, req.body)) {
            const error = new Error('Estructura incorrecta');
            error.statusCode = 400;
            throw error;
        }

        const invetarioId = parseInt(req.params.id);

        if (isNaN(invetarioId)) {
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        await abrirConexion();
        const inventariosdao = new invetariodao(nuevaConexcion);
        const inventarios = await inventariosdao.consultarInventario(invetarioId);

        if (inventarios.length <= 0) {
            const error = new Error('Inventario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (req.body.cantidad) {
            inventarios[0].cantidad = req.body.cantidad;
        }

        if (req.body.existencia) {
            inventarios[0].existencia = req.body.existencia;
        }

        if (req.body.idlibro) {
            inventarios[0].idlibro = req.body.idlibro;
        }

        let inventarioActualizado = new inventario(inventarios[0].idinventario, inventarios[0].cantidad, inventarios[0].existencia, inventarios[0].idlibro);
        await inventariosdao.actualizarInventario(invetarioId,req.body.cantidad);
        await cerrarConexion();

        res.json(inventarioActualizado);
    } catch (err) {
        next(err);
    }
}

exports.deleteInventario = async (req, res, next) => {
    try {
        const inventarioId = parseInt(req.params.id);

        if (isNaN(inventarioId)) {
            const error = new Error('ID invalido');
            error.statusCode = 400;
            throw error;
        }

        abrirConexion();
        const invetariosdao = new invetariodao(nuevaConexcion);
        const inventario = await invetariosdao.consultarInventario(inventarioId);

        if (inventario.length <= 0) {
            const error = new Error('Invetario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        await invetariosdao.eliminarInventario(inventarioId);
        cerrarConexion();

        res.json("Inventario eliminado")
    } catch (err) {
        next(err);
    }
}