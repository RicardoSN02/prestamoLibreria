const readline = require('readline-sync');
const libroDao = require('./daos/librosDAO');
const instanciaLibro = new libroDao();

console.log("   °-----------------°-----------------°");
console.log("                 BIBLIOTECA");
console.log("   °-----------------°-----------------°");
console.log();

async function menu(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Administrar usuarios');
    console.log('   2. Administrar libros');
    console.log('   3. Salir');

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
            console.log("Saliendo ... ... .. .. .");            
            break;
        default:
            break;
    }
}

async function menuUsuarios(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar usuario');
    console.log('   2. Actualizar usuario');
    console.log('   3. Consultar usuario');
    console.log('   4. Eliminar usuario');
    console.log('   5. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            menuUsuarios();
            break;
        case 2:
            menuUsuarios();
            break;    
        case 3:
            menuUsuarios();
            break;
        case 4:
            menuUsuarios();
            break;
        case 5:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuUsuarios();
            break;
    }
}

async function menuLibros(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Registrar libro');
    console.log('   2. Consultar libro');
    console.log('   3. Eliminar libro');
    console.log('   4. Realizar prestamo');
    console.log('   5. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            console.log("REGISTRO DE LIBRO");
            console.log("Ingrese datos");
            console.log("   °-----------------°-----------------°");

            const nombreLibro = readline.question("Nombre del libro: ");
            const autor = readline.question("Nombre del autor: ");
            const editorial = readline.question("Nombre de la editorial: ");

            instanciaLibro.insertarLibro(nombreLibro, autor, editorial);
            menuUsuarios();
            break;
        case 2:
            console.log("CONSULTA DE LIBRO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idBuscado = readline.question("Seleccione una opcion: ");
            let idLibro = parseInt(idBuscado);

            instanciaLibro.consultarLibro(idLibro);
            menuUsuarios();
            break;    
        case 3:
            console.log("ELIMINAR LIBRO");
            console.log("Ingrese ID");
            console.log("   °-----------------°-----------------°");

            const idEliminar = readline.question("Seleccione una opcion: ");
            let idBorrado = parseInt(idEliminar);

            instanciaLibro.eliminarLibro(idBorrado);
            menuUsuarios();
            break;
        case 4:
            menuUsuarios();
            break;
        case 5:
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuLibros();
            break;
    }
}

menu();