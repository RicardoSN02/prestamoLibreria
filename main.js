const readline = require('readline-sync');
const conexion = require('./conexion/conexion');

const libroDao = require('./daos/librosDAO');
const socioDao = require('./daos/sociosDAO');
const inventarioDao = require('./daos/inventarioDAO');
const prestamoDAO = require('./daos/prestamoDAO');

const socio = require('./objetos/socio');
const inventario = require('./objetos/inventario');
const libro = require('./objetos/libro');
const prestamo = require('./objetos/prestamo');

const nuevaConexcion = new conexion();

const instanciaLibroDao = new libroDao(nuevaConexcion);
const instanciaSocioDao = new socioDao(nuevaConexcion);
const instanciaInventarioDao = new inventarioDao(nuevaConexcion);
const instanciaPrestamoDao = new prestamoDAO(nuevaConexcion);


nuevaConexcion.abrirConexion();

console.log("   °-----------------°-----------------°");
console.log("                 BIBLIOTECA");
console.log("   °-----------------°-----------------°");
console.log();

async function menu(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Administrar socios');
    console.log('   2. Administrar libros');
    console.log('   3. Administrar inventario');
    console.log('   4. Administrar prestramo');
    console.log('   5. Administrar reserva');
    console.log('   6. Administrar multa');
    console.log('   7. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            menuUsuarios();
            break;
        case 2:
            menuLibros();
            break;   
        case 3:
            menuInventario();
            break;
        case 4:
            menuPrestamo();
            break; 
        case 5:
            menuLibros();
            break;
        case 6:
            menuLibros();
            break;
        case 7:
            console.log("Saliendo ... ... .. .. .");     
            nuevaConexcion.cerrarConexion();       
            break;
        default:
            break;
    }
}

async function menuSocios(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar socio');
    console.log('   2. Actualizar socio');
    console.log('   3. Consultar socio');
    console.log('   4. Eliminar socio');
    console.log('   5. Realizar prestamo');
    console.log('   6. Reservar');
    console.log('   7. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRO DE SOCIO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const nombreSocio = readline.question("Nombre: ");
            const emailSocio = readline.question("Correo electrónico: ");
            const passwordSocio = readline.question("Contraseña: ");
            const telefonoSocio = readline.question("Teléfono : ");
            const tipoUsuario = readline.question("Tipo de usuario: Administrador   |   Socio");

            instanciaSocioDao.insertarSocio(new socio(nombreSocio, emailSocio, passwordSocio, telefonoSocio, tipoUsuario));

            menuSocios();
            break;
        case 2:
            console.log("ACTUALIZACION DE DATOS");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");
            const idSocio = readline.question("ID: ");
            let idBuscado = parseInt(idBuscado);
            const nombreSocioNuevo = readline.question("Nombre: ");
            const emailSocioNuevo = readline.question("Correo electrónico: ");
            const passwordSocioNuevo = readline.question("Contraseña: ");
            const telefonoSocioNuevo = readline.question("Teléfono : ");
            const tipoUsuarioNuevo = readline.question("Tipo de usuario: Administrador   |   Socio");

            instanciaSocioDao.actualizarSocio(new socio(nombreSocio, emailSocio, passwordSocio, telefonoSocio, tipoUsuario, idBuscado));

            menuSocios();
            break;    
        case 3:
            console.log("CONSULTA DE SOCIOS");
            console.log("Ingrese datos");
            const idSocioConsultado = readline.question("ID: ");
            let idConsultado = parseInt(idSocioConsultado);

            instanciaSocioDao.consultarSocio(idConsultado);

            menuSocios();
            break;
        case 4:
            const idSocioEliminar = readline.question("ID: ");
            let idEliminado = parseInt(idSocioEliminar);

            instanciaSocioDao.eliminarSocio(idEliminado);

            menuSocios();
            break;
        case 5:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuSocios();
            break;
    }
}

async function menuLibros(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar libro');
    console.log('   2. Actualizar libro');
    console.log('   3. Consultar libro');
    console.log('   4. Eliminar libro');
    console.log('   5. Consultar libros');
    console.log('   6. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRO DE LIBRO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const nombreLibro = readline.question("Nombre del libro: ");
            const editorial = readline.question("Nombre de la editorial: ");
            const fechaPublicacion = readline.question("Fecha de publicación (aaaa/mm/dd): ");
            const categoria = readline.question("Categoria: ");
            const autor = readline.question("Nombre del autor: ");

            instanciaLibroDao.insertarLibro(new libro(nombreLibro, editorial, fechaPublicacion, categoria, autor ));

            menuUsuarios();
            break;
        case 2:
            console.log("ACTUALIZAR LIBRO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const nombreLibroNuevo = readline.question("Nombre del libro: ");
            const editorialNuevo = readline.question("Nombre de la editorial: ");
            const fechaPublicacionNuevo = readline.question("Fecha de publicación (aaaa/mm/dd): ");
            const categoriaNuevo = readline.question("Categoria: ");
            const autorNuevo = readline.question("Nombre del autor: ");

            instanciaLibroDao.actualizarLibro(new libro(nombreLibroNuevo, editorialNuevo, fechaPublicacionNuevo, categoriaNuevo, autorNuevo));

            break;
        case 3:
            console.log("CONSULTA DE LIBRO POR");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idBuscado = readline.question("ID: ");
            let idLibro = parseInt(idBuscado);

            instanciaLibroDao.consultarLibro(idLibro);
            menuUsuarios();
            break;    
        case 4:
            console.log("ELIMINAR LIBRO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            instanciaLibroDao.eliminarLibro(idBorrado);
            menuUsuarios();
            break;
        case 5:
            console.log("CONSULTAR LIBROS");
            console.log("   °-----------------°-----------------°");

            instanciaLibroDao.consultarLibros();

            menuUsuarios();
            break;
        case 6:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuLibros();
            break;
    }
}

async function menuInventario(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Añadir en inventario');
    console.log('   2. Actualizar al inventario');
    console.log('   3. Eliminar del inventario');
    console.log('   4. Consultar inventarios');
    console.log('   5. Consultar inventario por ID');
    console.log('   6. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("AÑADIR AL INVENTARIO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const cantidad = readline.question("Cantidad: ");
            let cantidadNueva = parseInt(cantidad);
            const existencia = readline.question("Existencia: ");
            let existenciaNueva = parseInt(existencia);
            const idLibroInventariar = readline.question("ID de libro: ");
            let libroNuevo = parseInt(idLibroInventariar);

            instanciaInventarioDao.agregarInventario(new inventario(cantidadNueva, existenciaNueva, libroNuevo));

            menuInventario();
            break;
        case 2:
            console.log("ACTUALIZAR INVENTARIO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idBuscado = readline.question("ID: ");
            let idActualizar = parseInt(idBuscado);
            const cantidadActualizar = readline.question("Cantidad nueva: ");
            let cantidadActualizada = parseInt(cantidadActualizar);

            instanciaInventarioDao.actualizarInventario(cantidadActualizada, idActualizar);
            menuInventario();
            break;    
        case 3:
            console.log("ELIMINAR INVENTARIO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            instanciaInventarioDao.eliminarInventario(idBorrado);

            menuInventario();
            break;
        case 4:
            console.log("CONSULTA DE INVENTARIOS");
            console.log("   °-----------------°-----------------°");

            instanciaInventarioDao.consultarInventarios();

            menuInventario();
            break;
        case 5:
            console.log("CONSULTA DE INVENTARIO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultado = readline.question("ID: ");
            let idResult = parseInt(idConsultado);

            instanciaInventarioDao.consultarInventario(idResult);

            menuInventario();
            break;
        case 6:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuInventario();
            break;
    }
}

async function menuPrestamo(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar prestamo');
    console.log('   2. Renovar prestamo');
    console.log('   3. Consultar prestamo por ID');
    console.log('   4. Consultar prestamos');
    console.log('   5. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRAR PRESTAMO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const fechaInicio = readline.question("Fecha de entrega (aaaa/mm/dd): ");
            const FechaFin = readline.question("Fecha de devolución (aaaa/mm/dd): ");
            const estado = readline.question("Estado: ");
            const idLibro = readline.question("ID libro: ");
            let idLibroPrestamo = parseInt(idLibro);
            const idSocio = readline.question("ID socio: ");
            let idSocioPrestamo = parseInt(idSocio);

            instanciaPrestamoDao.registrarPrestamo(new prestamo(fechaInicio, FechaFin, estado, idLibroPrestamo, idSocioPrestamo));

            menuPrestamo();
            break;
        case 2:
            console.log("RENOVAR PRESTAMO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idRenovar = readline.question("ID: ");
            let idActualizado = parseInt(idRenovar);
            const FechaDevolucionNueva = readline.question("Fecha de devolución (aaaa/mm/dd): ");
            const estadoNuevo = readline.question("Cantidad nueva: ");
            let estadoActualizado= parseInt(estadoNuevo);

            instanciaPrestamoDao.renovarPrestamo(FechaDevolucionNueva, estadoActualizado, idActualizado);

            menuPrestamo();
            break;    
        case 3:
            console.log("CONSULTAR PRESTAMO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            instanciaPrestamoDao.consultarPrestamo(idResult);

            menuPrestamo();
            break;
        case 4:
            console.log("CONSULTA DE PRESTAMOS");
            console.log("   °-----------------°-----------------°");

            instanciaPrestamoDao.consultarPrestamos();

            menuPrestamo();
            break;
        case 5:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuPrestamo();
            break;
    }
}

menu();