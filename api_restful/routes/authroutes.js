const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authControlador.js')

router.post('/login',authcontroller.login);
router.post('/verificar',authcontroller.tokenActivo);


module.exports = router;