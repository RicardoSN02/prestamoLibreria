const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const conexion = require('../../accesobd/conexion/conexion.js');
const sociodao = require('../../accesobd/daos/sociosDAO.js')

const nuevaConexcion = new conexion();

async function abrirConexion(){
   await nuevaConexcion.abrirConexion();
}

async function cerrarConexion(){
   await nuevaConexcion.cerrarConexion();
}

const secretKey = process.env.SECRET_KEY;

router.post('/login', async (req,res) => {
  const { email, password} = req.body;

  

  await abrirConexion();
  const instanciaSocioDao = new sociodao(nuevaConexcion);

  const usuario = await instanciaSocioDao.consultarSocioCorreo(email);

  await cerrarConexion();

  if(!usuario[0] || usuario[0].contrasenia !== password){
    return res.status(401).json({error: 'credenciales invalidas'});
  }

  const expiresIn = 1800; //media hora

  const token = jwt.sign({userId: usuario.id},secretKey,{expiresIn});

  res.json({token});
  console.log(token);
});

module.exports = router;