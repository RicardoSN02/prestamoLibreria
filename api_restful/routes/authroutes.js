const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authControlador.js')

router.post('/login',authcontroller.login);


module.exports = router;