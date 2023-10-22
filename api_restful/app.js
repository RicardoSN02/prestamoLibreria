const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const librosRutas = require('./routes/librosrutas');
app.use('/libreria',librosRutas);

const authRoutes = require('./routes/authroutes');
app.use('/auth', authRoutes);

/**
 * const protectedRoutes = require('./routes/protectedRoutes');
 * app.use('/protegido', protectedRoutes);
 * 
 */
// Middleware de rutas protegidas

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
})