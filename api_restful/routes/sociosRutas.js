const express = require('express');
const router = express.Router();
const SocioController = require('../controllers/socioControlador');
const { verifyToken } = require('../controllers/socioControlador');

// Rutas
router.get('/',verifyToken,SocioController.getAllLibros);
router.post('/socio',verifyToken, SocioController.addLibro);
router.get('/socio/:id',verifyToken,SocioController.getLibroById);
router.put('/socio/:id',verifyToken, SocioController.updateLibro);
router.delete('/socio/:id',verifyToken ,SocioController.deleteLibro);

module.exports = router;