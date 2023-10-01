const readline = require('readline-sync');


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
    console.log('   2. Consultar usuario');
    console.log('   3. Realizar prestamo');
    console.log('   4. Salir');

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
            menu();
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            menuLibros();
            break;
    }
}

menu();