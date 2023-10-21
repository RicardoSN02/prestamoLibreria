const express = require('express');
const app = express();

app.use(express.json());

const librosRutas = require('./routes/librosrutas');
app.use('/libreria',librosRutas);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = 8082;
app.listen(PORT, () =>{
    console.log(`Servidor en ejecucion en el puerto ${PORT}`)
})