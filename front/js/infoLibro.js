var idFinal;
var libroFinal;


document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroString = urlParams.get('libro');
    var id = urlParams.get('id')
    var libro = JSON.parse(decodeURIComponent(libroString));
    idFinal = id;
    libroFinal = libro;

    
    // console.log("info Imagen:", 'data:image/png;base64,' + libro.imagen);


    if (libro.imagen) {
        var imagenResultado = document.getElementById('imagenLibro');
        imagenResultado.src = 'data:image/png;base64,' + libro.imagen;
        imagenResultado.alt = libro.titulo;
    } else {
        console.error('Error: libro.imagenLibro está indefinido o nulo.');
    }

    document.getElementById('titulo').innerText = libro.titulo;
    document.getElementById('autor').innerText = libro.autor;
    document.getElementById('editorial').innerText = libro.editorial;

    var fechaPublicacion = moment(libro.fechaPublicacion);
    var formatoFecha = fechaPublicacion.format('DD/MM/YYYY');

    document.getElementById('fechaPublicacion').innerText = formatoFecha;

    document.getElementById('categoria').innerText = libro.categoria;
    document.getElementById('resumen').innerText = libro.resumen;

    //console.log(id);

    //consulta el inventario para poner el estado
    fetch('http://localhost:8082/inventarios/inventarioLibro/' + id)
        .then(response => response.json())
        .then(data => {
            if (data) {
                var estadoElement = document.getElementById('estado');

                if (data[0].cantidad === 0) {
                    estadoElement.innerText = "Sin disponibilidad";
                    estadoElement.classList.add("sin-disponibilidad");
                    const btnReserva = document.getElementById('reservar');
                    if (btnReserva) {
                        // Oculta el botón
                        btnReserva.style.display = 'none';
                    }
                } else {
                    estadoElement.innerText = "Disponible";
                    estadoElement.classList.add("disponible");
                }
            } else {
                console.error("No se encontró el inventario del libro seleccionado");
            }
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));


});

function abrirCarrito() {
    const libroString = 'carrito.html?id=' + idFinal + '&libro=' + encodeURIComponent(JSON.stringify(libroFinal));
    console.log(libroString)
    window.location.href = libroString;

};