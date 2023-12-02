const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioControlador.');
const { verifyToken } = require('../controllers/authControlador');


router.get('/', verifyToken, inventarioController.getAllInventario);
router.post('/inventario', inventarioController.addInventario);
router.get('/inventario/:id', inventarioController.getInventarioById);
router.get('/inventarioLibro/:id', inventarioController.getInventarioByLibroId);
router.put('/inventario/:id', inventarioController.updateInventario);
router.delete('/inventario/:id', inventarioController.deleteInventario);

module.exports = router;