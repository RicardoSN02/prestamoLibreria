const express = require('express');
const router = express.Router();
const PrestamoController = require('../controllers/prestamoControlador');
const { verifyToken } = require('../controllers/authControlador');

// Rutas
router.get('/',verifyToken,PrestamoController.getAllPrestamos);
router.post('/prestamo',verifyToken, PrestamoController.addPrestamo);
router.get('/prestamo/:id',verifyToken,PrestamoController.getPrestamoById);
router.put('/prestamo/:id',verifyToken, PrestamoController.updatePrestamo);

module.exports = router;