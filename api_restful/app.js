const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const authRoutes = require('./routes/authroutes');
app.use('/auth', authRoutes);

const librosRutas = require('./routes/librosrutas');
app.use('/libros',librosRutas);

const multasRutas = require('./routes/multasRutas');
app.use('/multas', multasRutas);

const sociosRutas = require('./routes/sociosRutas');
app.use('/socios', sociosRutas);

const prestamosRutas = require('./routes/prestamosRutas');
app.use('/prestamos', prestamosRutas);


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
})