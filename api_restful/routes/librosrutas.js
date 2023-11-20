const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroControlador');
const { verifyToken } = require('../controllers/authControlador');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Rutas
router.get('/',verifyToken,libroController.getAllLibros);
router.post('/libro',verifyToken, upload.single('imagen'), libroController.addLibro);
router.get('/libro/:id',verifyToken,libroController.getLibroById);
router.put('/libro/:id',verifyToken,upload.single('imagen'), libroController.updateLibro);
router.delete('/libro/:id',verifyToken ,libroController.deleteLibro);

module.exports = router;