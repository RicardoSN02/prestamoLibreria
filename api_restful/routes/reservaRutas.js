const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reservaControlador');
const { verifyToken } = require('../controllers/authControlador');

// Rutas
router.get('/',verifyToken,ReservaController.getAllReservas);
router.post('/reserva',verifyToken, ReservaController.addReservas);
router.get('/reserva/:id',verifyToken,ReservaController.getReservaById);
router.delete('/reserva/:id',verifyToken, ReservaController.deleteReserva);

module.exports = router;