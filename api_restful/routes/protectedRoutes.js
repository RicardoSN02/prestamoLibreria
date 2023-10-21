const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
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
};

//ejemplo
router.get('/',verifyToken, (req,res) =>{
    res.json({mensaje: 'ruta protegida'});
});

module.exports = router;