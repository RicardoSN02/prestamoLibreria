const readline = require('readline-sync');


console.log("   °-----------------°-----------------°");
console.log("                 BIBLIOTECA");
console.log("   °-----------------°-----------------°");
console.log();

async function menu(){
    console.log("    --- --- --- --- --- --- --- --- ---")
    console.log('   1. Administrar usuarios');
    console.log('   2. Administrar libros');
    console.log('   3. Administrar prestamos');
    console.log('   4. Salir');

    const numero = readline.question("Seleccione una opcion: ");
    let num = parseInt(numero);
    console.log();

    switch(num){
        case 1:
            break;
        case 2:
            break;    
        case 3:
            break;
        case 4:
            console.log("Saliendo ... .. .");
            break;
    }
}

menu();