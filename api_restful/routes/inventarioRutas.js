const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioControlador.');
const { verifyToken } = require('../controllers/authControlador');


router.get('/', verifyToken, inventarioController.getAllInvetario);
router.post('/invetario', verifyToken, inventarioController.addInventario);
router.get('/invetario/:id', verifyToken, inventarioController.getInventarioById);
router.put('/invetario/:id', verifyToken, inventarioController.updateInventario);
router.delete('/invetario/:id', verifyToken, inventarioController.deleteInventario);

module.exports = router;