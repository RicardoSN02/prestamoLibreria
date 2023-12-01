const jwt = require('jsonwebtoken');
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

exports.login =  async (req,res) =>{
    const { email, password} = req.body;

    await abrirConexion();
    
    const instanciaSocioDao = new sociodao(nuevaConexcion);
  
    const usuario = await instanciaSocioDao.consultaLogin(email,password);
  
    await cerrarConexion();
  
    if(!usuario){
      return res.status(401).json({error: 'credenciales invalidas'});
    }
  
    const expiresIn = 1800; //media hora
  
    const token = jwt.sign({userId: usuario},secretKey,{expiresIn});
  
    res.json({token,usuario});
    console.log(token);
}

exports.verifyToken = (req,res,next) =>{
    const token = req.header('Authorization');

    if (!token){
        return res.status(401).json({error: 'Token no proporcionado'});
    }

    try{
        const secretKey = process.env.SECRET_KEY;
        const tokenWithoutBearer = token.split(" ")[1];
        const decoded = jwt.verify(tokenWithoutBearer,secretKey);

        req.userId = decoded.userId;
        next();
    }catch(error){
        res.status(401).json({error: 'Token invalido'});
    }
}

exports.tokenActivo = (req,res,next) =>{
    const token = req.header('Authorization');

    if (!token){
        return res.status(401).json({error: 'Token no proporcionado'});
    }

    try{
        const secretKey = process.env.SECRET_KEY;
        const tokenWithoutBearer = token.split(" ")[1];
        const decoded = jwt.verify(tokenWithoutBearer,secretKey);

        req.userId = decoded.userId;
        
        res.json({estado: "valido"})
    }catch(error){
        res.status(401).json({error: 'Token invalido'});
    }
}
