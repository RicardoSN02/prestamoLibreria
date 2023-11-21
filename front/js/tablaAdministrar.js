    // Supongamos que tienes un array de objetos que representan tus datos
    var datos = [{
            titulo: 'Libro 1',
            autor: 'Autor 1',
            fecha: '2022-01-01',
            categoria: 'Ficción',
            editorial: 'Editorial A'
        },
        // Agrega más objetos según sea necesario
    ];

// Función para agregar filas a la tabla
function agregarFila(data) {
    var tbody = document.getElementById('miTabla').getElementsByTagName('tbody')[0];
    var fila = tbody.insertRow();

    // Agrega celdas a la fila
    for (var key in data) {
        var celda = fila.insertCell();
        celda.textContent = data[key];
    }

    // Agrega celda de acciones con botones
    var accionesCelda = fila.insertCell();
    accionesCelda.className = 'acciones';
    accionesCelda.innerHTML = `
        <button class="editar" onclick="editarFila(this)">Editar</button>
        <button class="eliminar" onclick="eliminarFila(this)">Eliminar</button>
      `;
}

// Función para cargar datos en la tabla
function cargarDatosEnTabla() {
    datos.forEach(function (item) {
        agregarFila(item);
    });
}

// Llama a la función para cargar datos en la tabla al cargar la página
cargarDatosEnTabla();

// Funciones de edición y eliminación similares a las anteriores
function editarFila(btn) {
    var fila = btn.closest('tr');
    // Implementa la lógica de edición aquí
    console.log('Editar fila: ', fila.textContent);
}

function eliminarFila(btn) {
    var fila = btn.closest('tr');
    fila.remove();
    // Implementa la lógica de eliminación aquí
    console.log('Eliminar fila: ', fila.textContent);
} 