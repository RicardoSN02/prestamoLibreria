const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroControlador');
const { verifyToken } = require('../controllers/authControlador');

// Rutas
router.get('/',verifyToken,libroController.getAllLibros);
router.post('/libro',verifyToken, libroController.addLibro);
router.get('/libro/:id',verifyToken,libroController.getLibroById);
router.put('/libro/:id',verifyToken, libroController.updateLibro);
router.delete('/libro/:id',verifyToken ,libroController.deleteLibro);

module.exports = router;