const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroControlador');

// Rutas
router.get('/', libroController.getAllLibros);
router.post('/libro', libroController.addLibro);
router.get('/libro/:id', libroController.getLibroById);
router.put('/libro/:id', libroController.updateLibro);
router.delete('/libro/:id', libroController.deleteLibro);

module.exports = router;