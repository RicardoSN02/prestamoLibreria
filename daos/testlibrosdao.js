const libroDao = require('../daos/librosDAO.js');
const libro = require('../objetos/libro.js');
const conexion = require('../conexion/conexion.js');

const claseconexion = new conexion();
iniciarConexion();


const instanciaLibro = new libroDao(claseconexion);

const jsDate = new Date('2002-02-02');
//id,titulo,editorial,fechaPublicacion,categoria,autor
let libro1 = new libro(0,"1984","planeta",jsDate,"sci-fi","george orswell");
let libro2 = new libro(0,"la metamorfosis","planeta",jsDate,"terror","franz kafka");
let libro3 = new libro(0,"el viejo y el mar","planeta",jsDate,"narrativo","ernest hsasdfadway");

//prueba insertar
/*
insertar(libro1);
insertar(libro2);
insertar(libro3);
*/

//prueba actualizar

//prueba eliminar

//prueba consultar todos
console.log(consultarLibros());


//prueba consultar

cerrarConexion();

async function insertar(libro){
   await instanciaLibro.insertarLibro(libro);
}

async function iniciarConexion(){
    await claseconexion.abrirConexion();
}

async function cerrarConexion(){
    await claseconexion.cerrarConexion();
}

async function consultarLibros(){
  let consultas = await instanciaLibro.consultarLibros();
  console.log(consultas);
}