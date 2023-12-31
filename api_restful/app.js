const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

app.use('/public/uploads', express.static('public/uploads'));

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

const reservasRutas = require('./routes/reservaRutas');
app.use('/reservas', reservasRutas);

const invemtarioRuta = require('./routes/inventarioRutas');
app.use('/inventarios', invemtarioRuta)

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
})