const readline = require('readline-sync');
const conexionn = require('./conexion/conexion.js');

const librodao = require('./daos/librosDAO.js');
const sociodao = require('./daos/sociosDAO.js');
const inventariodao = require('./daos/inventarioDAO.js');
const prestamodao = require('./daos/prestamoDAO.js');
const reservadao = require('./daos/reservaDAO.js');
const multadao = require('./daos/multaDAO.js');

const socio = require('./objetos/socio.js');
const inventario = require('./objetos/inventario.js');
const libro = require('./objetos/libro.js');
const prestamo = require('./objetos/prestamo.js');
const reserva = require('./objetos/reserva.js');
const multa = require('./objetos/multa.js');

const nuevaConexcion = new conexionn();

abrirConexion();

const instanciaLibroDao = new librodao(nuevaConexcion);
const instanciaSocioDao = new sociodao(nuevaConexcion);
const instanciaInventarioDao = new inventariodao(nuevaConexcion);
const instanciaPrestamoDao = new prestamodao(nuevaConexcion);
const instanciaReservaDao = new reservadao(nuevaConexcion);
const instanciaMultaDao = new multadao(nuevaConexcion);



async function abrirConexion(){
   await nuevaConexcion.abrirConexion();
}

async function cerrarConexion(){
   await nuevaConexcion.cerrarConexion();
}

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
            menuSocios();
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
            menuReserva();
            break;
        case 6:
            menuMulta();
            break;
        case 7:
            console.log("Saliendo ... ... .. .. .");     
            await cerrarConexion();     
            break;
        default:
            break;
    }
}

async function menuSocios(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar socio');
    console.log('   2. Actualizar socio');
    console.log('   3. Consultar socio por ID');
    console.log('   4. Consultar socios');
    console.log('   5. Eliminar socio');
    console.log('   6. Salir');

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
            const tipoUsuario = readline.question("Tipo de usuario: Administrador   |   Socio\n");

            await instanciaSocioDao.insertarSocio(new socio(nombreSocio, emailSocio, passwordSocio, telefonoSocio, tipoUsuario));

            menuSocios();
            break;
        case 2:
            console.log("ACTUALIZACION DE DATOS");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");
            const idSocio = readline.question("ID: ");
            let idBuscado = parseInt(idSocio);
            const nombreSocioNuevo = readline.question("Nombre: ");
            const emailSocioNuevo = readline.question("Correo electrónico: ");
            const passwordSocioNuevo = readline.question("Contraseña: ");
            const telefonoSocioNuevo = readline.question("Teléfono : ");
            const tipoUsuarioNuevo = readline.question("Tipo de usuario: Administrador   |   Socio");

            await instanciaSocioDao.actualizarSocio(new socio(nombreSocioNuevo, emailSocioNuevo, passwordSocioNuevo, telefonoSocioNuevo, tipoUsuarioNuevo, idBuscado));

            menuSocios();
            break;    
        case 3:
            console.log("CONSULTA DE SOCIO POR ID");
            console.log("   °-----------------°-----------------°");

            console.log("Ingrese datos");
            const idSocioConsultado = readline.question("ID: ");
            let idConsultado = parseInt(idSocioConsultado);

            await instanciaSocioDao.consultarSocio(idConsultado);

            menuSocios();
            break;
        case 4:
            console.log("CONSULTA DE SOCIOS");
            console.log("   °-----------------°-----------------°");

            let resultadoSocio = await instanciaSocioDao.consultarSocios();
            console.log(resultadoSocio);

            menuSocios();
            break;
        case 5:
            console.log("ELIMINAR SOCIOS");
            console.log("   °-----------------°-----------------°");

            const idSocioEliminar = readline.question("ID: ");
            let idEliminado = parseInt(idSocioEliminar);

            await instanciaSocioDao.eliminarSocio(idEliminado);
           
            menuSocios();
            break;
        case 6:
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

            await instanciaLibroDao.insertarLibro(new libro(0,nombreLibro, editorial, new Date(fechaPublicacion), categoria, autor ));

            menuLibros();
            break;
        case 2:
            console.log("ACTUALIZAR LIBRO");
            let imprimirlibrosAct = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibrosAct);
            const idlibroact = readline.question("seleccione el id de un libro de la lista");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");


            const nombreLibroNuevo = readline.question("Nombre del libro: ");
            const editorialNuevo = readline.question("Nombre de la editorial: ");
            const fechaPublicacionNuevo = readline.question("Fecha de publicación (aaaa/mm/dd): ");
            const categoriaNuevo = readline.question("Categoria: ");
            const autorNuevo = readline.question("Nombre del autor: ");

            await instanciaLibroDao.actualizarLibro(new libro(idlibroact,nombreLibroNuevo, editorialNuevo, new Date(fechaPublicacionNuevo), categoriaNuevo, autorNuevo));
            menuLibros();

            break;
        case 3:
            console.log("CONSULTA DE LIBRO POR");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idBuscado = readline.question("ID: ");
            let idLibro = parseInt(idBuscado);

            let imprimirlibro = await instanciaLibroDao.consultarLibro(idLibro);
            console.log(imprimirlibro);

            menuLibros();
            break;    
        case 4:
            console.log("ELIMINAR LIBRO");
            let imprimirlibrosEl = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibrosEl);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            await instanciaLibroDao.eliminarLibro(idBorrado);

            menuLibros();
            break;
        case 5:
            console.log("CONSULTAR LIBROS");
            console.log("   °-----------------°-----------------°");

            let imprimirlibros = await instanciaLibroDao.consultarLibros();

            console.log(imprimirlibros);

            menuLibros();
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

            await instanciaInventarioDao.agregarInventario(new inventario(cantidadNueva, existenciaNueva, libroNuevo));

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

            await instanciaInventarioDao.actualizarInventario(cantidadActualizada, idActualizar);

            menuInventario();
            break;    
        case 3:
            console.log("ELIMINAR INVENTARIO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            await instanciaInventarioDao.eliminarInventario(idBorrado);

            menuInventario();
            break;
        case 4:
            console.log("CONSULTA DE INVENTARIOS");
            console.log("   °-----------------°-----------------°");

            await instanciaInventarioDao.consultarInventarios();

            menuInventario();
            break;
        case 5:
            console.log("CONSULTA DE INVENTARIO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultado = readline.question("ID: ");
            let idResult = parseInt(idConsultado);

            await instanciaInventarioDao.consultarInventario(idResult);

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

            await instanciaPrestamoDao.registrarPrestamo(new prestamo(fechaInicio, FechaFin, estado, idLibroPrestamo, idSocioPrestamo));

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

            await instanciaPrestamoDao.renovarPrestamo(FechaDevolucionNueva, estadoActualizado, idActualizado);

            menuPrestamo();
            break;    
        case 3:
            console.log("CONSULTAR PRESTAMO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            await instanciaPrestamoDao.consultarPrestamo(idResult);

            menuPrestamo();
            break;
        case 4:
            console.log("CONSULTA DE PRESTAMOS");
            console.log("   °-----------------°-----------------°");

            await instanciaPrestamoDao.consultarPrestamos();

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

async function menuReserva(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar reserva');
    console.log('   2. Eliminar');
    console.log('   3. Consultar reserva por ID');
    console.log('   4. Consultar reservas');
    console.log('   5. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRAR RESERVA");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const fechaEspera = readline.question("Fecha de entrega (aaaa-mm-dd): ");
            
            let imprimirlibros = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibros);
            const idLibro = readline.question("ID libro: ");
            let idLibroPrestamo = parseInt(idLibro);

            let resultadoSocio = await instanciaSocioDao.consultarSocios();
            console.log(resultadoSocio);
            const idSocio = readline.question("ID socio: ");
            let idSocioPrestamo = parseInt(idSocio);

            await instanciaReservaDao.registrarReserva(new reserva(0,new Date(fechaEspera),idLibroPrestamo, idSocioPrestamo));

            menuReserva();
            break;
        case 2:
            console.log("ELIMINAR RESERVA");
            let imprimirReservasEl = await instanciaReservaDao.consultarReservas();
            console.log(imprimirReservasEl);

            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idReservaEliminado = parseInt(idEliminar);

            await instanciaReservaDao.eliminarReserva(idReservaEliminado);

            menuReserva();
            break;    
        case 3:
            console.log("CONSULTAR RESERVA POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            let imprimirReserva = await instanciaReservaDao.consultarReserva(idResult);
            console.log(imprimirReserva);

            menuReserva();
            break;
        case 4:
            console.log("CONSULTA DE RESERVAS");
            console.log("   °-----------------°-----------------°");

            let imprimirReservas = await instanciaReservaDao.consultarReservas();
            console.log(imprimirReservas);

            menuReserva();
            break;
        case 5:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuReserva();
            break;
    }
}

async function menuMulta(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar multa');
    console.log('   2. Actualizar multa');
    console.log('   3. Eliminar multa');
    console.log('   4. Consultar prestamo por ID');
    console.log('   5. Consultar prestamos');
    console.log('   6. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRAR MULTA");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const registrarMulta = readline.question("Multa: ");
            let cantidad = parseInt(registrarMulta);
            const fechaMulta = readline.question("Fecha de multa (aaaa/mm/dd): ");
            const idPrestamo = readline.question("ID prestamo: ");
            let idPrestamoMultado = parseInt(idPrestamo);
            

            await instanciaMultaDao.registrarMulta(new multa(cantidad, fechaMulta, idPrestamoMultado));

            menuMulta();
            break;
        case 2:
            console.log("ACTUALIZAR MULTA");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const multaActualizada = readline.question("Multa: ");
            let multaNueva = parseInt(multaActualizada);
            const fechaMultaNueva = readline.question("Fecha de multa (aaaa/mm/dd): ");
            const idMulta = readline.question("ID prestamo: ");
            let idMultaActualizada = parseInt(idMulta);
            

            await instanciaMultaDao.actualizarMulta(idMultaActualizada, multaNueva, fechaMultaNueva);

            menuMulta();
            break;
        case 3:
            console.log("ELIMINAR MULTA");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idMultaEliminada = parseInt(idEliminar);

            await instanciaMultaDao.eliminarMulta(idMultaEliminada);

            menuMulta();
            break;   
        case 4:
            console.log("CONSULTAR MULTA POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            await instanciaMultaDao.consultarMulta(idResult);

            menuMulta();
            break;
        case 5:
            console.log("CONSULTA DE MULTAS");
            console.log("   °-----------------°-----------------°");

            await instanciaMultaDao.consultarMultas();

            menuMulta();
            break;
        case 6:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuMulta();
            break;
    }
}

menu();
