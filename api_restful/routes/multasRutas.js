const express = require('express');
const router = express.Router();
const multaController = require('../controllers/multaControlador.js');
const { verifyToken } = require('../controllers/authControlador');

router.get('/', verifyToken, multaController.getAllMultas);
router.post('/multa', verifyToken, multaController.addMulta);
router.get('/multa/:id', verifyToken,  multaController.getMultaById);
router.put('/multa/:id', verifyToken, multaController.updateMulta);
router.delete('/multa/:id', verifyToken, multaController.deleteMulta);

module.exports = router;