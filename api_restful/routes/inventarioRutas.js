const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioControlador.');
const { verifyToken } = require('../controllers/authControlador');


router.get('/', verifyToken, inventarioController.getAllInventario);
router.post('/inventario', verifyToken, inventarioController.addInventario);
router.get('/inventario/:id', verifyToken, inventarioController.getInventarioById);
router.put('/inventario/:id', verifyToken, inventarioController.updateInventario);
router.delete('/inventario/:id', verifyToken, inventarioController.deleteInventario);

module.exports = router;