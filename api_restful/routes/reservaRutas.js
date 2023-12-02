const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reservaControlador');
const { verifyToken } = require('../controllers/authControlador');

// Rutas
router.get('/',ReservaController.getAllReservas);
router.post('/reserva', ReservaController.addReservas);
router.get('/reserva/:id',verifyToken,ReservaController.getReservaById);
router.delete('/reserva/:id',verifyToken, ReservaController.deleteReserva);

module.exports = router;