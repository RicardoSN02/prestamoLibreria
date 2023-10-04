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

    await instanciaMultaDao.consultarMultas();

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
            menu();
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
            const emailSocio = validarCorreo();
            const passwordSocio = readline.question("Contrasenia: ");
            const telefonoSocio = validarNumero();
            const tipoUsuario = readline.question("Tipo de usuario: (admin|socio):");

            await instanciaSocioDao.insertarSocio(new socio(0,nombreSocio, emailSocio, passwordSocio, telefonoSocio, tipoUsuario));

            menuSocios();
            break;
        case 2:
            console.log("ACTUALIZACION DE DATOS");
            let resultadoSociosAct = await instanciaSocioDao.consultarSocios();
            if(resultadoSociosAct.length !==0){
            console.log(resultadoSociosAct);
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");
            const idSocio = readline.question("ID: ");
            let idBuscado = parseInt(idSocio);

            if(!validarIdSocio(resultadoSociosAct,idBuscado)){
                console.log("seleccione un id valido");
                menuSocios();
                break;
            }

            const nombreSocioNuevo = readline.question("Nombre: ");
            const emailSocioNuevo = validarCorreo();
            const passwordSocioNuevo = readline.question("Contrasenia: ");
            const telefonoSocioNuevo = validarNumero();
            const tipoUsuarioNuevo = readline.question("Tipo de usuario: (admin|socio): ");

            await instanciaSocioDao.actualizarSocio(new socio(idBuscado,nombreSocioNuevo, emailSocioNuevo, passwordSocioNuevo, telefonoSocioNuevo, tipoUsuarioNuevo));

            menuSocios();
            break;    

           }else{
             console.log("no existen registros en la bd");
             menuSocios();
             break;
           }
        case 3:
            console.log("CONSULTA DE SOCIO POR ID");
            console.log("   °-----------------°-----------------°");

            console.log("Ingrese datos");
            const idSocioConsultado = readline.question("ID: ");
            let idConsultado = parseInt(idSocioConsultado);

            let resultadoSocio = await instanciaSocioDao.consultarSocio(idConsultado);
            console.log(resultadoSocio);

            menuSocios();
            break;
        case 4:
            console.log("CONSULTA DE SOCIOS");
            console.log("   °-----------------°-----------------°");

            let resultadoSocios = await instanciaSocioDao.consultarSocios();
            console.log(resultadoSocios);

            menuSocios();
            break;
        case 5:
            console.log("ELIMINAR SOCIOS");
            let resultadoSociosEl = await instanciaSocioDao.consultarSocios();
            if(resultadoSociosEl.length !==0){
            console.log(resultadoSociosEl);
            console.log("   °-----------------°-----------------°");

            const idSocioEliminar = readline.question("ID: ");
            let idEliminado = parseInt(idSocioEliminar);

            if(!validarIdSocio(resultadoSociosEl,idEliminado)){
                console.log("seleccione un id valido");
                menuSocios();
                break;
            }  

            await instanciaSocioDao.eliminarSocio(idEliminado);
           
            menuSocios();
            break;
            }else{
             console.log("no existen registros en la bd");
             menuSocios();
             break;
            }
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
            const fechaPublicacion = validarFecha("Publicacion (aaaa-mm-dd)");
            const categoria = readline.question("Categoria: ");
            const autor = readline.question("Nombre del autor: \n");

            await instanciaLibroDao.insertarLibro(new libro(0,nombreLibro, editorial, crearFecha(fechaPublicacion), categoria, autor ));

            menuLibros();
            break;
        case 2:
            console.log("ACTUALIZAR LIBRO");
            let imprimirlibrosAct = await instanciaLibroDao.consultarLibros();
            if(imprimirlibrosAct.length !==0){
            console.log(imprimirlibrosAct);
            const idlibroact = readline.question("seleccione el id de un libro de la lista\n");

            if(!validarIdLibro(imprimirlibrosAct,idlibroact)){
                console.log("seleccione un id valido");
                menuLibros();
                break;
            }  
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");


            const nombreLibroNuevo = readline.question("Nombre del libro: ");
            const editorialNuevo = readline.question("Nombre de la editorial: ");
            const fechaPublicacionNuevo = validarFecha("Publicacion");
            const categoriaNuevo = readline.question("Categoria: ");
            const autorNuevo = readline.question("Nombre del autor: ");

            await instanciaLibroDao.actualizarLibro(new libro(idlibroact,nombreLibroNuevo, editorialNuevo, crearFecha(fechaPublicacionNuevo), categoriaNuevo, autorNuevo));
            menuLibros();

            break;

            }else{
              console.log("no existen registros en la bd");
              menuLibros();
              break;
            }
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

            if(imprimirlibrosEl.length !==0){
            console.log(imprimirlibrosEl);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            if(!validarIdLibro(imprimirlibrosEl,idBorrado)){
                console.log("seleccione un id valido");
                menuLibros();
                break;
            }  

            await instanciaLibroDao.eliminarLibro(idBorrado);

            menuLibros();
            break;

            }else{
              console.log("no existen registros en la bd");
              menuLibros();
              break;
            }
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

            let imprimirlibros = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibros);
            
            const idLibroInventariar = readline.question("ID de libro: ");

            

            let libroNuevo = parseInt(idLibroInventariar);

            if(!validarIdLibro(imprimirlibros,libroNuevo)){
                console.log("seleccione un id valido");
                menuInventario();
                break;
            }  

            await instanciaInventarioDao.agregarInventario(new inventario(0,cantidadNueva, existenciaNueva, libroNuevo));

            menuInventario();
            break;
        case 2:
            console.log("ACTUALIZAR INVENTARIO");
            let imprimirInventariosAct = await instanciaInventarioDao.consultarInventarios();

            if(imprimirInventariosAct.length !==0){
            console.log(imprimirInventariosAct);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idBuscado = readline.question("ID: ");
            let idActualizar = parseInt(idBuscado);

            if(!validarIdInventario(imprimirInventariosAct,idActualizar)){
                console.log("seleccione un id valido");
                menuInventario();
                break;
             }  
            const cantidadActualizar = readline.question("Cantidad nueva: ");
            let cantidadActualizada = parseInt(cantidadActualizar);

            await instanciaInventarioDao.actualizarInventario(idActualizar,cantidadActualizada);

            menuInventario();
            break; 

           }else{
            console.log("no existen registros en la bd");
            menuInventario();
            break;
           }
        case 3:
            console.log("ELIMINAR INVENTARIO");
            let imprimirInventariosEl = await instanciaInventarioDao.consultarInventarios();

            if(imprimirInventariosEl.length !==0){
            console.log(imprimirInventariosEl);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idBorrado = parseInt(idEliminar);

            if(!validarIdInventario(imprimirInventariosEl,idBorrado)){
                console.log("seleccione un id valido");
                menuInventario();
                break;
             }  

            await instanciaInventarioDao.eliminarInventario(idBorrado);

            menuInventario();
            break;
            }else{
              console.log("no existen registros en la bd");
              menuInventario();
              break;
            }
        case 4:
            console.log("CONSULTA DE INVENTARIOS");
            console.log("   °-----------------°-----------------°");

            let imprimirInventarios = await instanciaInventarioDao.consultarInventarios();
            console.log(imprimirInventarios);

            menuInventario();
            break;
        case 5:
            console.log("CONSULTA DE INVENTARIO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultado = readline.question("ID: ");
            let idResult = parseInt(idConsultado);

            let imprimirInventario = await instanciaInventarioDao.consultarInventario(idResult);
            console.log(imprimirInventario);

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

            const fechaInicio = validarFecha("de entrega (aaaa-mm-dd)"); 
            const FechaFin = validarFecha("de devolucion (aaaa-mm-dd)"); 

            let imprimirlibros = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibros);
            const idLibro = readline.question("ID libro: ");
            let idLibroPrestamo = parseInt(idLibro);

            if(!validarIdLibro(imprimirlibros,idLibroPrestamo)){
                console.log("seleccione un id valido");
                menuPrestamo();
                break;
            }

            let resultadoSocios = await instanciaSocioDao.consultarSocios();
            console.log(resultadoSocios);
            const idSocio = readline.question("ID socio: ");
            let idSocioPrestamo = parseInt(idSocio);

            if(!validarIdSocio(resultadoSocios,idSocioPrestamo)){
                console.log("seleccione un id valido");
                menuPrestamo();
                break;
            }

            await instanciaPrestamoDao.registrarPrestamo(new prestamo(0,crearFecha(fechaInicio),crearFecha(FechaFin), 'prestado', idLibroPrestamo, idSocioPrestamo));

            menuPrestamo();
            break;
        case 2:
            console.log("RENOVAR PRESTAMO");
            let imprimirPrestamosRe = await instanciaPrestamoDao.consultarPrestamos();
            if(imprimirPrestamosRe.length !==0){
            console.log(imprimirPrestamosRe);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idRenovar = readline.question("ID: ");
            let idActualizado = parseInt(idRenovar);

            if(!validarIdPrestamo(imprimirPrestamosRe,idActualizado)){
                console.log("seleccione un id valido");
                menuPrestamo();
                break;
             }  

            const FechaDevolucionNueva =  validarFecha("de devolucion (aaaa-mm-dd)"); 
            const estadoNuevo = readline.question("estado nuevo: (prestado,devuelto,atrasado)");

            //campos que contengan 0 no se actualizaran
            await instanciaPrestamoDao.renovarPrestamo(new prestamo(idActualizado,0,crearFecha(FechaDevolucionNueva), estadoNuevo, 0,0));

            menuPrestamo();
            break;    
            }else{
              console.log("no existen registros en la bd");
              menuPrestamo();
              break;
            }
        case 3:
            console.log("CONSULTAR PRESTAMO POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            let imprimirPrestamo = await instanciaPrestamoDao.consultarPrestamo(idResult);
            console.log(imprimirPrestamo);

            menuPrestamo();
            break;
        case 4:
            console.log("CONSULTA DE PRESTAMOS");
            console.log("   °-----------------°-----------------°");

            let imprimirPrestamos = await instanciaPrestamoDao.consultarPrestamos();
            console.log(imprimirPrestamos);
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

            const fechaEspera =  validarFecha("de espera (aaaa-mm-dd)"); 
            
            let imprimirlibros = await instanciaLibroDao.consultarLibros();
            console.log(imprimirlibros);
            const idLibro = readline.question("ID libro: ");
            let idLibroPrestamo = parseInt(idLibro);
            if(!validarIdLibro(imprimirlibros,idLibroPrestamo)){
                console.log("seleccione un id valido");
                menuReserva();
                break;
            }

            let resultadoSocio = await instanciaSocioDao.consultarSocios();
            console.log(resultadoSocio);
            const idSocio = readline.question("ID socio: ");
            let idSocioPrestamo = parseInt(idSocio);

            if(!validarIdSocio(resultadoSocio,idSocioPrestamo)){
                console.log("seleccione un id valido");
                menuReserva();
                break;
            }

            await instanciaReservaDao.registrarReserva(new reserva(0,crearFecha(fechaEspera),idLibroPrestamo, idSocioPrestamo));

            menuReserva();
            break;
        case 2:
            console.log("ELIMINAR RESERVA");
            let imprimirReservasEl = await instanciaReservaDao.consultarReservas();

            if(imprimirReservasEl.length !== 0){ 
            console.log(imprimirReservasEl);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("ID: ");
            let idReservaEliminado = parseInt(idEliminar);
            
            if(!validarIdReserva(imprimirReservasEl,idReservaEliminado)){
                console.log("seleccione un id valido");
                menuReserva();
                break;
            }   

            await instanciaReservaDao.eliminarReserva(idReservaEliminado);

            menuReserva();
            break;    
            }else{
                console.log("no existen registros en la bd");
                menuReserva();
                break;
            }
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

            const registrarMulta = readline.question("Multa (cantidad/precio): ");
            let cantidad = parseInt(registrarMulta);
            const fechaMulta = validarFecha("de multa (aaaa-mm-dd)");
            
            let imprimirPrestamos = await instanciaPrestamoDao.consultarPrestamos();
            console.log(imprimirPrestamos);
            const idPrestamo = readline.question("ID prestamo: ");
            let idPrestamoMultado = parseInt(idPrestamo);
            
            if(!validarIdPrestamo(imprimirPrestamos,idPrestamoMultado)){
                console.log("seleccione un id valido");
                menuMulta();
                break;
             }

            await instanciaMultaDao.registrarMulta(new multa(0,cantidad, crearFecha(fechaMulta), idPrestamoMultado));

            menuMulta();
            break;
        case 2:
            console.log("ACTUALIZAR MULTA");
            let imprimirMultasAct = await instanciaMultaDao.consultarMultas();

            if(imprimirMultasAct.length !== 0){
            console.log(imprimirMultasAct);
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idRenovar = readline.question("ID: ");
            let idActualizado = parseInt(idRenovar);

            if(!validarIdMulta(imprimirMultasAct,idActualizado)){
                console.log("seleccione un id valido");
                menuMulta();
                break;
             }  

            const multaActualizada = readline.question("Multa: ");
            let multaNueva = parseInt(multaActualizada);
            const fechaMultaNueva = validarFecha("de multa (aaaa-mm-dd)")
    
            await instanciaMultaDao.actualizarMulta(new multa(idActualizado,multaNueva, crearFecha(fechaMultaNueva),0));

            menuMulta();
            break;
            }else{
                console.log("no existen registros en la bd");
                menuMulta();
                break;
            }
            
        case 3:
            console.log("ELIMINAR MULTA");
            let imprimirMultasEl = await instanciaMultaDao.consultarMultas();

            if(imprimirMultasEl.length !==0){
             console.log(imprimirMultasEl);
             console.log("Ingrese ID");
             console.log("   °-----------------°-----------------°");

             const idEliminar = readline.question("ID: ");
             let idMultaEliminada = parseInt(idEliminar);

             if(!validarIdMulta(imprimirMultasEl,idMultaEliminada)){
                console.log("seleccione un id valido");
                menuMulta();
                break;
             }  

             await instanciaMultaDao.eliminarMulta(idMultaEliminada);

             menuMulta();
             break;  

            }else{
                console.log("no existen registros en la bd");
                menuMulta();
                break;
            }
             
        case 4:
            console.log("CONSULTAR MULTA POR ID");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idConsultar = readline.question("ID: ");
            let idResult = parseInt(idConsultar);

            let imprimirMulta = await instanciaMultaDao.consultarMulta(idResult);
            console.log(imprimirMulta);

            menuMulta();
            break;
        case 5:
            console.log("CONSULTA DE MULTAS");
            console.log("   °-----------------°-----------------°");

            let imprimirMultas = await instanciaMultaDao.consultarMultas();
            console.log(imprimirMultas);

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


//validaciones
function crearFecha(fecha){
    let fechaRegresar = new Date(fecha);
    return fechaRegresar;
}

function validarFecha(tipoFecha){
    let regex = /^\d{4}-\d{2}-\d{2}$/;
    let fecha = 0;

    do{
     fecha = readline.question("ingrese fecha de "+tipoFecha+": ");

     if(!regex.test(fecha)){
      console.log("ingrese fecha en formato: aaaa-mm-dd"); 
     }

    }while(!regex.test(fecha));

    return fecha;
}

function campoVacio(campo){
   if(campo === ""){
     return true;
   }else{
     return false;
   }
}

function validarCorreo(){
   let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
   let correo = 0;
   do{
    correo = readline.question("email: ");

    if(!regex.test(correo)){
      console.log("ingrese correo en formato valido (ejemplo@ejemplo.com)"); 
    }

   }while(!regex.test(correo));

   return correo;
}

function validarNumero(){
    let regex = /^\d{10}$/;
    let numero = 0;
    do{
     numero = readline.question("telefono: ");

     if(!regex.test(numero)){
      console.log("ingrese telefono valido: (numero de 10 digitos xxxxxxxxxx"); 
     }

    }while(!regex.test(numero));

    return numero;
}



function validarIdReserva(lista,id){
    for (const buscar of lista) {
        if (buscar.idreserva === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

function validarIdLibro(lista,id){
    for (const buscar of lista) {
        if (buscar.idlibro === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

function validarIdMulta(lista,id){
    for (const buscar of lista) {
        if (buscar.idmulta === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

function validarIdPrestamo(lista,id){
    for (const buscar of lista) {
        if (buscar.idprestamo === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

function validarIdInventario(lista,id){
    for (const buscar of lista) {
        if (buscar.idinventario === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

function validarIdSocio(lista,id){
    for (const buscar of lista) {
        if (buscar.idsocio === id) {
          return true; // El ID existe en la lista
        }
      }
      return false; // El ID no existe en la lista
}

//mucho