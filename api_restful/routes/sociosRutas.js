const express = require('express');
const router = express.Router();
const SocioController = require('../controllers/socioControlador');
const { verifyToken } = require('../controllers/authControlador');

// Rutas
router.get('/',verifyToken,SocioController.getAllSocios);
router.post('/socio', SocioController.addSocio);
router.get('/socio/:id',verifyToken,SocioController.getSocioById);
router.put('/socio/:id',verifyToken, SocioController.updateSocio);
router.delete('/socio/:id',verifyToken ,SocioController.deleteSocio);

module.exports = router;